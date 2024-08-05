import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useCreateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";
import { resizeImage } from "../lib/resize-image";
import toast from "react-hot-toast";

export default function CreateTvseries() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      stars: null,
      image: "",
      note: "",
    },
  });

  const [char, setChar] = useState(0);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [createOneTvseries, { isLoading, isSuccess }] =
    useCreateOneTvseriesMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
      setImg("");
      setChar(0);
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
      toast.error(error?.data?.message);
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
              onChange: (e) => setChar(e.target.value.length),
              onDrop: (e) => e.preventDefault(),
            })}
          />
          <span>{char}/200</span>
        </>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Kreating..." : "Kreate"}
        </button>
        <Link className="linkGoBack" to={"/dashboard"}>
          &larr; back
        </Link>
      </form>
    </section>
  );
}
