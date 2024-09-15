import { rateLimit } from "express-rate-limit";
import { throwError } from "../lib/throw-error.js";

/**
 * @constant
 * Object containing password related routes.
 *
 * @type {{ register: string; login: string; forgotPassword: string; resetPassword: string; updateProfile: string; }}
 */
const routesWithPassword = {
  register: "/register",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  updateProfile: "/profile",
};

/**
 * @typedef {Object} ExpressRequest
 * @typedef {Object} ExpressResponse
 *
 * @function
 * Express rate limit middleware to restrict requests to routes.
 *
 * (Uses express-rate-limit pkg)
 *
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 *
 * @throws Error if the rate limit is exceeded.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: (req, res) => {
    const { url } = req;

    const isRouteHavingToDoWithPassword = Object.values(
      routesWithPassword
    ).some((route) => url.startsWith(route));

    if (isRouteHavingToDoWithPassword) return 5;
    else return 50;
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers["cf-connecting-ip"] || req.ip,
  handler: (req, res) => {
    throwError(res, 429, "Too many request. Try again later.");
  },
});

export { limiter };
