import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { resizeImage } from "../lib/resize-image";
import TextareaChars from "../components/textarea-chars/textarea-chars";
import LinkBack from "../components/link-back/link-back";
import toast from "react-hot-toast";

export default function CreateTvseries() {
  const { register, handleSubmit, reset, control } = useForm({
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
      reset();
      setImg("");
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate, reset]);

  const handleImageConversionAndResize = async (e) => {
    try {
      const image = e.target.files[0];
      const compressedImage = await resizeImage(image);
      setImg(compressedImage);
    } catch (err) {}
  };

  const handleCreateOneTvseries = async (data) => {
    data.image = img;
    try {
      const res = await createOneTvseries(data).unwrap();
      toast.success(res?.message);
    } catch (error) {
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
      <form onSubmit={handleSubmit(handleCreateOneTvseries)}>
        <label htmlFor="title">
          Title<span className="label-asterisk">*</span>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          autoComplete="off"
          {...register("title")}
        />
        <label htmlFor="stars">
          Stars<span className="label-asterisk">*</span>
        </label>
        <input
          type="number"
          id="stars"
          placeholder="Enter number (1-5)"
          autoComplete="off"
          {...register("stars")}
        />
        <label htmlFor="image">
          {img ? <img src={img} /> : null}
          Image<span className="label-asterisk">*</span>
        </label>
        <input
          {...register("image", {
            onChange: (e) => {
              handleImageConversionAndResize(e);
            },
          })}
          type="file"
          id="image"
          accept="image/*"
        />
        <>
          <label htmlFor="note">
            Note<span className="label-asterisk">*</span>
          </label>
          <textarea
            id="note"
            placeholder="Enter note"
            autoComplete="off"
            maxLength={200}
            {...register("note", {
              onDrop: (e) => e.preventDefault(),
            })}
          />
          <FormProvider control={control}>
            <TextareaChars />
          </FormProvider>
        </>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Kreating..." : "Kreate"}
        </button>
        <LinkBack linkHref={"/dashboard"} />
      </form>
    </section>
  );
}
