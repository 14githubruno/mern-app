import { useHeadTags } from "../hooks/use-head-tags";
import { useEffect, useState } from "react";
import {
  useUpdateOneTvseriesMutation,
  useGetOneTvseriesQuery,
} from "../redux/api/tvseries-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resizeImage } from "../lib/resize-image";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Loader from "../components/loader/loader";
import Form from "../components/form/form";
import toast from "react-hot-toast";

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
          />
        </FormProvider>
      ) : (
        <Loader />
      )}
    </section>
  );
}
