// components
import Form from "../components/form/form";

// react lib
import { useEffect, useState } from "react";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// react-router-dom lib
import { useNavigate } from "react-router-dom";

// redux lib
import { useCreateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";

// lib/hooks
import { resizeImage } from "../lib/resize-image";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import { useHeadTags } from "../hooks/use-head-tags";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";

// pkgs
import toast from "react-hot-toast";

/**
 * Create new tveries page component.
 *
 * Allow user to create new tvseries.
 *
 * @returns {JSX.Element} The rendered CreateTvseries page component.
 */
export default function CreateTvseries() {
  const [img, setImg] = useState("");

  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      title: "",
      stars: null,
      image: "",
      note: "",
    },
  });

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
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      parsedData.image = img;
      const res = await createOneTvseries(parsedData).unwrap();
      toast.success(res?.message);
    } catch (err) {
      if (err?.data?.type === "tokenInvalid") {
        resetAll();
      }
      toast.error(err?.data?.message || err?.error);
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
          formLinkHrefToGoBack="/dashboard"
        />
      </FormProvider>
    </section>
  );
}
