import { useHeadTags } from "../hooks/use-head-tags";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { resizeImage } from "../lib/resize-image";
import { parseFormData } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function CreateTvseries() {
  const methods = useForm({
    defaultValues: {
      title: "",
      stars: null,
      image: "",
      note: "",
    },
  });

  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const resetAll = useResetApiAndUser();
  const [createOneTvseries, { isLoading, isSuccess }] =
    useCreateOneTvseriesMutation();

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      setImg("");
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate, methods.reset]);

  // this below fires a useEffect
  useHeadTags("createTvseries");

  const handleImageConversionAndResize = async (e) => {
    try {
      const image = e.target.files[0];
      const compressedImage = await resizeImage(image);
      setImg(compressedImage);
    } catch (err) {}
  };

  const handleCreateOneTvseries = async (data) => {
    const parsedData = parseFormData(data);
    if (parsedData === false) {
      toast.error("Data structure is not valid");
      return;
    }

    try {
      parsedData.image = img;
      const res = await createOneTvseries(parsedData).unwrap();
      toast.success(res?.message);
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
          typeOfForm={"create tvseries"}
          onSubmit={handleCreateOneTvseries}
          inputFileProps={{
            typeOfFile: "image",
            file: img,
            funcForInputFile: handleImageConversionAndResize,
          }}
          formButtonProps={{
            isLoading,
            textOnLoading: "Kreating...",
            text: "Kreate",
          }}
        />
      </FormProvider>
    </section>
  );
}
