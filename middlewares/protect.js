// lib
import { decodeToken } from "../lib/decode-token.js";

// db models
import User from "../models/user-model.js";

/**
 * @async
 * @function
 * Middleware to check if user is authenticated and thus protect private routes.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - Function to call the next middleware.
 *
 * @throws Error if authentication fails or an unexpected error occurs.
 */
const protect = async (req, res, next) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  const accessToken = auth?.split(" ")[1];
  const refreshToken = req.headers["refresh-token"];
  const cookieToken = req.cookies.jwt;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({
      message: "Authentication failed: missing token",
      type: "tokenInvalid",
    });
  }

  if (refreshToken && !cookieToken) {
    return res.status(403).json({
      message: "Authentication failed: missing cookie",
      type: "tokenExpiration",
    });
  }

  try {
    const decodedRefreshToken = decodeToken(
      refreshToken,
      process.env.REFRESH_SECRET
    );
  } catch (err) {
    return res.status(401).json({
      message: `Authentication failed: refresh token invalid`,
      type: "tokenInvalid",
    });
  }

  try {
    const decodedAccessToken = decodeToken(
      accessToken,
      process.env.ACCESS_SECRET
    );
    const decodedCookieToken = decodeToken(
      cookieToken,
      process.env.COOKIE_SECRET
    );

    req.user = await User.findOne({
      _id: decodedAccessToken.key,
      email: decodedCookieToken.key,
    }).select("-password");
    next();
  } catch (err) {
    if (err.message.includes("expired")) {
      return res.status(403).json({
        message: "Authentication failed: expired token",
        type: "tokenExpiration",
      });
    } else {
      return res.status(401).json({
        message: "Authentication failed: invalid token",
        type: "tokenInvalid",
      });
    }
  }
};

export { protect };
