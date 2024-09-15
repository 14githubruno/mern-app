import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

/**
 * @constant
 * Object containing image file extensions.
 *
 * @type {{ JPEG: string; JPG: string; PNG: string; WEBP: string; }}
 */
const imgExt = {
  JPEG: "JPEG",
  JPG: "JPG",
  PNG: "PNG",
  WEBP: "WEBP",
};

/**
 * @async
 * @function
 * Resize uploaded image.
 *
 * @param {File} img - The image file to resize.
 *
 * @returns {Promise<Base64>} A promise that resolves with a Base64-encoded string of the image.
 */
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
