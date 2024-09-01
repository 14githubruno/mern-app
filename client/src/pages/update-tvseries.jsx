import { useHeadTags } from "../hooks/use-head-tags";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resizeImage } from "../lib/resize-image";
import { parseFormData } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function Update() {
  const [tvseriesToUpdate, setTvseriesToUpdate] = useState(null);
  const [img, setImg] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const resetAll = useResetApiAndUser();
  const [updateOneTvseries, { isLoading, isSuccess }] =
    useUpdateOneTvseriesMutation();

  const methods = useForm({
    defaultValues: async () => {
      const findTvseriesToUpdate = tvseries?.find(
        (singleSeries) => singleSeries._id === params.id
      );
      setTvseriesToUpdate((prev) => ({ ...prev, ...findTvseriesToUpdate }));
      setImg(findTvseriesToUpdate.image);
      return findTvseriesToUpdate;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

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
    const parsedData = parseFormData(data);
    if (parsedData === false) {
      toast.error("Data structure is not valid");
      return;
    }

    //quick check on the client if user did update any field or didn't
    if (JSON.stringify(parsedData) === JSON.stringify(tvseriesToUpdate)) {
      toast.error("You did not update any field");
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
    </section>
  );
}
