import { rateLimit } from "express-rate-limit";
import { throwError } from "../lib/throw-error.js";

const routesWithPassword = {
  register: "/register",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  updateProfile: "/profile",
};

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
