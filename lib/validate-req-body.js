import { zodSchemas } from "../zod/zod-schemas.js";
import { throwError } from "./throw-error.js";

/**
 * @async
 * @function
 * To validate req.body data using Zod schemas.
 *
 * @param {Response} res - The Express response object.
 * @param {string} validation - The type of validation to perform (i.e. "register-user").
 * @param {Object} data - The request body data to validate (req.body).
 *
 * @returns {Promise<Object>} Resolves with the validated data obj on success, or rejects with an error.
 * @throws Error if validation or parsing fail.
 */
const validate = async (res, validation, data) => {
  let isEmpty = Object.values(data).some((value) => value === "");
  if (isEmpty) throwError(res, 400, "All fields are required");

  let schema;
  switch (validation) {
    case "register-user":
    case "update-user":
      schema = zodSchemas.registerUpdateUserSchema;
      break;
    case "login-user":
      schema = zodSchemas.loginUserSchema;
      break;
    case "reset-password":
      schema = zodSchemas.resetPasswordSchema;
      break;
    case "create-tvseries":
    case "update-tvseries":
      schema = zodSchemas.createUpdateOneTvseriesSchema;
      break;
    case "check-email":
      schema = zodSchemas.checkEmailSchema;
      break;
    case "check-secret":
      schema = zodSchemas.checkSecretSchema;
      break;
  }

  try {
    const parsedData = schema.parse(data);
    if (parsedData) return parsedData;
    else throwError(res, 500, "Something went wrong. Try again");
  } catch (error) {
    const errorMessages = error.errors.map((err) => err.message);
    throwError(res, 400, `${errorMessages.join("\n")}`);
  }
};

export { validate };
