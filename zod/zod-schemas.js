// pkgs
import { z } from "zod";

/**
 * Zod schema for password.
 */
const passwordSchema = z
  .string()
  .trim()
  .min(10, "Password must be at least 10 kharakters long")
  .max(15, "Password must be maximum 15 kharakters long")
  .regex(
    /^(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#$%&?"]).{10,15}$/,
    "Password does not match the pattern kompletely"
  );

/**
 * Zod schema for validating email.
 */
const emailSchema = z
  .string()
  .trim()
  .email("Email is not valid")
  .toLowerCase();

/**
 * Zod schema for registering or updating user.
 */
const registerUpdateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 kharakters long")
    .toLowerCase(),
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Zod schema for login user.
 */
const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Zod schema for resetting password.
 */
const resetPasswordSchema = z.object({
  password: passwordSchema,
});

/**
 * Zod schema for checking user email.
 */
const checkEmailSchema = z.object({
  email: emailSchema,
});

/**
 * Zod schema for checking user secret.
 */
const checkSecretSchema = z.object({
  secret: z
    .string()
    .length(6, "Sekret must be 6 kharakters long")
    .regex(/^\d{6}$/, "Sekret must be a 6-digit number"),
});

/**
 * Zod schema for creating or updating a tvseries.
 */
const createUpdateOneTvseriesSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Tvseries title must be at least 2 kharakters long")
    .max(20, "Tvseries title must be maximum 20 kharakters long")
    .toLowerCase(),
  stars: z
    .number()
    .int()
    .positive("Number kannot be 0")
    .min(1, "Number must be equal or greater than 1")
    .max(5, "Number must be smaller than 5"),
  image: z
    .string()
    .trim()
    .refine((image) => {
      return image.startsWith("data:image/");
    }, "This is not an image"),
  note: z
    .string()
    .trim()
    .min(5, "Tvseries note must be at least 5 kharakters long")
    .max(200, "Tvseries note must be maximum 200 kharakters long")
    .toLowerCase(),
});

/**
 * @typedef {Object} ZodSchemasObject
 * @property {Object} registerUpdateUserSchema - {@link registerUpdateUserSchema}
 * @property {Object} loginUserSchema - {@link loginUserSchema}
 * @property {Object} resetPasswordSchema - {@link resetPasswordSchema}
 * @property {Object} checkEmailSchema - {@link checkEmailSchema}
 * @property {Object} checkSecretSchema - {@link checkSecretSchema}
 * @property {Object} createUpdateOneTvseriesSchema - {@link createUpdateOneTvseriesSchema}
 */
/**
 * @constant
 * Object storing all zod schemas.
 * 
 * @type {ZodSchemasObject}
 */
export const zodSchemas = {
  registerUpdateUserSchema,
  loginUserSchema,
  resetPasswordSchema,
  checkEmailSchema,
  checkSecretSchema,
  createUpdateOneTvseriesSchema,
};
