import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateOneTvseriesMutation } from "../redux/api/tvseries-api-slice";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resizeImage } from "../lib/resize-image";
import TextareaChars from "../components/textarea-chars/textarea-chars";
import LinkBack from "../components/link-back/link-back";
import toast from "react-hot-toast";

export default function Update() {
  const [tvseriesToUpdate, setTvseriesToUpdate] = useState(null);
  const [img, setImg] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const [updateOneTvseries, { isLoading, isSuccess }] =
    useUpdateOneTvseriesMutation();

  const { register, handleSubmit, control } = useForm({
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

  const handleImageConversionAndResize = async (e) => {
    try {
      const image = e.target.files[0];
      const compressedImage = await resizeImage(image);
      setImg(compressedImage);
    } catch (err) {}
  };

  const handleUpdateOneTvseries = async (data) => {
    //quick check on the client if user did update any field or didn't
    if (JSON.stringify(data) === JSON.stringify(tvseriesToUpdate)) {
      toast.error("You did not update any field");
      return;
    }

    data.image = img;

    try {
      const res = await updateOneTvseries(data).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleUpdateOneTvseries)}>
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
          {...register("stars", {
            valueAsNumber: true,
          })}
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
          {isLoading ? "Updating..." : "Update"}
        </button>
        <LinkBack linkHref={"/dashboard"} />
      </form>
    </section>
  );
}
