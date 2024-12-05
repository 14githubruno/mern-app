// components
import Form from "../components/form/form";
import Loader from "../components/loader/loader";

// react hooks
import { useEffect, useState } from "react";

// redux
import {
  useUpdateOneTvseriesMutation,
  useGetOneTvseriesQuery,
} from "../redux/api/tvseries-api-slice";

// react-router-dom lib
import { useNavigate, useParams } from "react-router-dom";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// lib/hooks
import { useHeadTags } from "../hooks/use-head-tags";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { resizeImage } from "../lib/resize-image";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";

// pkgs
import toast from "react-hot-toast";

/**
 * UpdateTvseries page component.
 *
 * In this page user can modify details of one tvseries.
 *
 * @returns {JSX.Element} The rendered UpdateTvseries page component.
 */
export default function UpdateTvseries() {
  const [img, setImg] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const methods = useForm();

  const resetAll = useResetApiAndUser();
  const { data: singleTvseries, error } = useGetOneTvseriesQuery(params);
  const [updateOneTvseries, { isLoading, isSuccess }] =
    useUpdateOneTvseriesMutation();

  useEffect(() => {
    if (singleTvseries) {
      setImg(singleTvseries.body.image);
      methods.reset({ ...singleTvseries.body });
    }
  }, [singleTvseries, methods.reset]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard", { replace: true });
    } else if (error) {
      navigate("/dashboard", { replace: true });
      toast.error(error.data.message);
    }
  }, [isSuccess, navigate, error]);

  // this below fires a useEffect
  useHeadTags("updateTvseries", params.title);

  const handleImageConversionAndResize = async (e) => {
    try {
      const image = e.target.files[0];
      const compressedImage = await resizeImage(image);
      setImg(compressedImage);
    } catch (err) {}
  };

  const handleUpdateOneTvseries = async (data) => {
    //quick check on the client if user did update any field or didn't
    if (JSON.stringify(data) === JSON.stringify(singleTvseries.body)) {
      toast.error("You did not update any field");
      return;
    }

    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      parsedData.image = img;
      const res = await updateOneTvseries(parsedData).unwrap();
      toast.success(res.message);
    } catch (err) {
      if (err.data.type === "token") {
        toast.error("Token has expired. Log in again");
        resetAll();
        return;
      }
      toast.error(err.data.message);
    }
  };

  return (
    <section>
      {singleTvseries ? (
        <FormProvider {...methods}>
          <Form
            typeOfForm={"update tvseries"}
            onSubmit={handleUpdateOneTvseries}
            inputFileProps={{
              typeOfFile: "image",
              file: img,
              funcForInputFile: handleImageConversionAndResize,
            }}
            formButtonProps={{
              isLoading,
              textOnLoading: "Updating...",
              text: "Update",
            }}
            formLinkHrefToGoBack="/dashboard"
          />
        </FormProvider>
      ) : (
        <Loader />
      )}
    </section>
  );
}
