import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

const imgExt = {
  JPEG: "JPEG",
  JPG: "JPG",
  PNG: "PNG",
  WEBP: "WEBP",
};

const resizeImage = (img) => {
  return new Promise((resolve, reject) => {
    const { JPEG, JPG, PNG, WEBP } = imgExt;

    try {
      Resizer.imageFileResizer(
        img,
        480,
        480,
        `${JPEG || JPG || PNG || WEBP}`,
        70,
        0,
        (imageResized) => {
          resolve(imageResized);
        }
      );
    } catch (err) {
      reject(err);
      toast.error("It appears you did not select an image. Try again");
    }
  });
};

export { resizeImage };
