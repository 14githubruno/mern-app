import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

const resizeImage = (img) => {
  return new Promise((resolve, reject) => {
    let JPEG = "JPEG";
    let PNG = "PNG";
    let WEBP = "WEBP";

    try {
      Resizer.imageFileResizer(
        img,
        480,
        480,
        `${JPEG || PNG || WEBP}`,
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
