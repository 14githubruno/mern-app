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
  keyGenerator: (req, res) => {
    console.log("IP", req.ip);
    console.log(req.hostname);
    console.log(req.protocol);
    return req.ip;
  },
  handler: (req, res) => {
    console.log(req.ip);
    if (req.rateLimit) {
      const { rateLimit } = req;
      const localDate = new Date(rateLimit.resetTime);
      throwError(
        res,
        429,
        `Too many requests. Please, try again later, after ${localDate.toLocaleTimeString()}`
      );
    }
  },
});

export { limiter };
