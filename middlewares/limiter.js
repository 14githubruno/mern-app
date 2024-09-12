import { rateLimit } from "express-rate-limit";
import { throwError } from "../lib/throw-error.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 70,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  handler: (req, res) => {
    if (req.rateLimit) {
      const { rateLimit } = req;
      throwError(
        res,
        429,
        `Too many requests. Please, try again later, after ${rateLimit.resetTime.toLocaleTimeString()}`
      );
    }
  },
});

export { limiter };
