// pkgs
import asyncHandler from "express-async-handler";

// db models
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";
import Symbol from "../models/symbol-model.js";
import PseudoUser from "../models/pseudo-user-model.js";

// lib
import { validate } from "../lib/validate-req-body.js";
import { generateToken } from "../lib/generate-token.js";
import { decodeToken } from "../lib/decode-token.js";
import { generateSecret } from "../lib/generate-secret.js";
import { hashPassword } from "../lib/hash-password.js";
import { comparePassword } from "../lib/compare-password.js";
import { sendEmail } from "../config/email/send-email.js";
import { throwError } from "../lib/throw-error.js";

/**
 * @async
 * @function
 * Controller to register a new user
 *
 * POST /api/users/register
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const registerUser = asyncHandler(async (req, res) => {
  const parsedData = await validate(res, "register-user", req.body);
  const { name, email, password } = parsedData;

  const userExists = await User.findOne({ email, verified: true });
  if (userExists) throwError(res, 400, "User already exists");

  const hashed = await hashPassword(res, password);
  const userExistsUnverified = await User.findOne({ email, verified: false });

  const newPseudoUser = await PseudoUser.create({
    name,
    email,
    password: hashed,
  });

  let newUserToVerify;
  if (newPseudoUser && !userExistsUnverified) {
    newUserToVerify = await User.create({
      name,
      email,
      password: hashed,
    });
  }

  let symbol;
  if (newPseudoUser) {
    symbol = await Symbol.create({
      user: newPseudoUser._id,
      token: generateToken(res, newPseudoUser._id),
      secret: generateSecret(),
    });
  }

  if (newPseudoUser && symbol) {
    res.status(201).json({
      message: `Dear [${newPseudoUser.name}], check your mailbox to verify your akkount`,
      body: {
        _id: newPseudoUser._id,
        name: newPseudoUser.name,
        token: symbol.token,
      },
    });
    sendEmail(
      res,
      email,
      `Verify your email, dear ${newPseudoUser.name}`,
      `Hi, ${newPseudoUser.name}, we need to verify your email.\nSend back this kode to verify it: ${symbol.secret} \nThe kode will be valid for 15 minutes.`
    );
  } else {
    throwError(
      res,
      400,
      "Dara are not valid or something went wrong. Try again"
    );
  }
});

/**
 * @async
 * @function
 * Controller to verify if token exists or expired
 *
 * GET /api/users/verify/:token
 *
 * GET /api/users/verify-password-secret/:token
 *
 * GET /api/users/reset-password/:token
 *
 * GET /api/users/profile/verify/:token
 *
 * Public routes
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const verifyToken = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const symbol = await Symbol.findOne({ token });

  if (!symbol) {
    throwError(res, 400, "Token invalid or expired");
  } else {
    res.status(200).json({
      message: "There is token",
    });
  }
});

/**
 * @async
 * @function
 * Controller to verify user and confirm registration
 *
 * PATCH /api/users/verify/:token
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const verifyUser = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const parsedData = await validate(res, "check-secret", req.body);
  const { secret } = parsedData;

  const symbol = await Symbol.findOne({
    token,
    secret,
  });
  if (!symbol) throwError(res, 400, "Sekrets do not match or token is invalid");

  const decoded = decodeToken(res, symbol.token);
  const pseudoUser = await PseudoUser.findById(decoded._id);
  if (!pseudoUser)
    throwError(res, 400, "Sekrets do not match or token invalid");

  const finalUser = await User.findOneAndUpdate(
    { email: pseudoUser.email, verified: false },
    {
      $set: {
        name: pseudoUser.name,
        password: pseudoUser.password,
        verified: true,
      },
    },
    { new: true }
  );

  if (finalUser) {
    res.status(200).json({
      message: `Dear [${finalUser.name}], your email is verified. You kan log in`,
    });
  } else {
    throwError(
      res,
      500,
      "Something went wrong with email verifikation. Try again"
    );
  }
});

/**
 * @async
 * @function
 * Controller to log in and authorize user
 *
 * POST /api/users/login
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const loginUser = asyncHandler(async (req, res) => {
  const parsedData = await validate(res, "login-user", req.body);
  const { email, password } = parsedData;

  const user = await User.findOne({ email });
  if (!user)
    throwError(res, 400, "Kredentials are not valid or user doesn't exists");
  if (!user.verified)
    throwError(
      res,
      400,
      `Dear [${user.name}], your email is not verified. Check your email`
    );

  const match = await comparePassword(res, password, user.password);
  if (user && match) {
    const token = generateToken(res, user._id, "3d");
    const cookieMaxAge = 3 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000;

    res
      .cookie("jwt", token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: true,
        maxAge: cookieMaxAge,
      })
      .status(200)
      .json({
        message: `User [${user.name}] is logged in`,
        body: {
          _id: user._id,
          name: user.name,
          tokenExpDate: Date.now() + cookieMaxAge,
        },
      });
  } else {
    throwError(res, 400, "Kredentials are not valid");
  }
});

/**
 * @async
 * @function
 * Controller to start password resetting
 *
 * POST /api/users/forgot-password
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const parsedData = await validate(res, "check-email", req.body);
  const { email } = parsedData;

  const user = await User.findOne({ email });
  if (!user) throwError(res, 400, "User does not exist");

  const symbol = await Symbol.create({
    user: user._id,
    token: generateToken(res, user._id),
    secret: generateSecret(),
  });

  if (symbol) {
    res.status(201).json({
      message: `Dear [${user.name}], check your mailbox to reset your password`,
      body: {
        _id: user._id,
        name: user.name,
        token: symbol.token,
      },
    });
    sendEmail(
      res,
      email,
      `Reset your password, dear ${user.name}`,
      `Hi, ${user.name}.\nSend back this kode to reset your password: ${symbol.secret} \nThe kode will be valid for 15 minutes.`
    );
  } else {
    throwError(res, 400, "Data are not valid");
  }
});

/**
 * @async
 * @function
 * Controller to verify password secret code
 *
 * PATCH /api/users/verify-password-secret/:token
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const verifyPasswordSecret = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const parsedData = await validate(res, "check-secret", req.body);
  const { secret } = parsedData;

  const symbol = await Symbol.findOne({
    token,
    secret,
  });

  if (!symbol) throwError(res, 400, "Sekrets do not match or token invalid");

  const decoded = decodeToken(res, symbol.token);
  const user = await User.findById(decoded._id);

  if (!user) {
    throwError(res, 500, "Something went wrong. Try again");
  } else {
    symbol.token = generateToken(res, user._id);
    const updatedToken = await symbol.save();

    if (updatedToken) {
      res.status(201).json({
        message: `Dear [${user.name}], reset now your password to verify your akkount and log in`,
        body: {
          _id: user._id,
          name: user.name,
          token: updatedToken.token,
        },
      });
    } else {
      throwError(res, 500, "Something went wrong. Try again");
    }
  }
});

/**
 * @async
 * @function
 * Controller to complete password resetting
 *
 * PATCH /api/users/reset-password/:token
 *
 * Public route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const parsedData = await validate(res, "reset-password", req.body);
  const { password } = parsedData;

  const symbol = await Symbol.findOne({ token });
  if (!symbol) throwError(res, 400, "Sekrets do not match or token invalid");

  const decoded = decodeToken(res, symbol.token);
  const hashed = await hashPassword(res, password);
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { password: hashed } },
    { new: true }
  );

  if (updatedUser) {
    const deleteSymbol = await Symbol.deleteOne({ token });

    if (deleteSymbol.acknowledged) {
      return res.status(200).json({
        message: `Dear [${updatedUser.name}], your password has been reset. You kan now log in`,
      });
    } else {
      throwError(
        res,
        500,
        "Something went wrong with password reset. Try again"
      );
    }
  } else {
    throwError(res, 500, "Something went wrong with password reset. Try again");
  }
});

/**
 * @async
 * @function
 * Controller to logout user and clear authorization cookie
 *
 * POST /api/users/logout
 *
 * Private route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const logoutUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: `User [${currentUser.name}] successfully logged out`,
    });
  } catch (error) {
    throwError(res, 500, "Error logging out");
  }
});

/**
 * @async
 * @function
 * Controller to get user data (no password)
 *
 * GET /api/users/profile
 *
 * Private route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const user = await User.findById(currentUser._id);
  if (!user) throwError(res, 404, "User not found");

  res.status(200).json({
    body: {
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
    },
  });
});

/**
 * @async
 * @function
 * Controller to update user data
 *
 * POST /api/users/profile
 *
 * Private route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const parsedData = await validate(res, "update-user", req.body);
  const { name, email, password } = parsedData;

  const takenEmail = await User.findOne({
    email,
    _id: { $ne: currentUser._id },
  });
  if (takenEmail) throwError(res, 400, "This email seems already taken");

  let user = await User.findById(currentUser._id);
  if (!user) throwError(res, 404, "User not found");

  const match = await comparePassword(res, password, user.password);
  const dataMatch = match && name === user.name && email === user.email;
  if (dataMatch) throwError(res, 400, "You did not update any data");

  const pseudoUser = await PseudoUser.create({
    user: currentUser._id,
    name,
    email,
    password: await hashPassword(res, password),
  });

  const symbol = await Symbol.create({
    user: currentUser._id,
    token: generateToken(res, currentUser._id),
    secret: generateSecret(),
  });

  if (pseudoUser && symbol) {
    res.status(201).json({
      message: `Dear [${pseudoUser.name}], check your mailbox to update your akkount`,
      body: {
        token: symbol.token,
      },
    });
    sendEmail(
      res,
      email,
      `Verify your akkount, dear ${pseudoUser.name}`,
      `Hi, ${pseudoUser.name}.\nSend back this kode to verify your akkount and update your data: ${symbol.secret} \nThe kode will be valid for 15 minutes.`
    );
  } else {
    throwError(res, 400, "Data are not valid");
  }
});

/**
 * @async
 * @function
 * Controller to confirm user data updates
 *
 * PATCH /api/users/profile/verify/:token
 *
 * Private route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const verifyUpdateUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const token = req.params.token;

  const parsedData = await validate(res, "check-secret", req.body);
  const { secret } = parsedData;

  const symbol = await Symbol.findOne({
    token,
    secret,
  });
  if (!symbol) throwError(res, 400, "Sekrets do not match or token invalid");

  const pseudoUsers = await PseudoUser.find({ user: currentUser._id })
    .sort({ $natural: -1 })
    .limit(1);

  if (!pseudoUsers.length === 1)
    throwError(
      res,
      400,
      "You do not seem authorized or something went wrong. Try again"
    );

  const decoded = decodeToken(res, token);
  const pseudoUser = pseudoUsers[0];
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    {
      $set: {
        name: pseudoUser.name,
        email: pseudoUser.email,
        password: pseudoUser.password,
      },
    },
    { new: true }
  );

  if (updatedUser) {
    const deleteSymbol = await Symbol.deleteOne({
      token,
      secret,
    });

    const deletePseudoUser = await PseudoUser.deleteOne({
      user: currentUser._id,
    });

    if (deleteSymbol.acknowledged && deletePseudoUser.acknowledged) {
      return res.status(200).json({
        message: `Dear [${updatedUser.name}], your akkount is verified and your data are updated`,
        body: {
          _id: updatedUser._id,
          name: updatedUser.name,
          token: symbol.token,
        },
      });
    } else {
      throwError(
        res,
        500,
        "Something went wrong with email verifikation. Try again"
      );
    }
  } else {
    throwError(
      res,
      500,
      "Something went wrong with email verifikation. Try again"
    );
  }
});

/**
 * @async
 * @function
 * Controller to delete user account
 *
 * (if user has tvseries, delete them too)
 *
 * DELETE /api/users/profile/:id
 *
 * Private route
 *
 * (Controller is wrapped by asyncHandler)
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void} JSON response
 * @throws Error if something fails (custom errorHandler will catch the error thrown by throwError fn and send it to client)
 */
const deleteUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const id = req.params.id;

  const userToDelete = await User.findById(id);

  if (!userToDelete) throwError(res, 401, "User not found");

  if (userToDelete._id.toString() !== currentUser._id.toString()) {
    throwError(res, 401, "User not authorized");
  }

  const userTvseries = await Tvseries.find({
    user: userToDelete._id,
  });

  const deletedUser = await User.deleteOne(userToDelete);
  if (deletedUser.acknowledged && userTvseries.length === 0) {
    res.clearCookie("jwt");
    res.status(201).json({
      message: `User [${userToDelete.name}] deleted`,
    });
  }

  // if user has tvseries, delete them too
  let deleteTvseries;
  if (deletedUser.acknowledged && userTvseries.length > 0) {
    deleteTvseries = await Tvseries.deleteMany({
      user: userToDelete._id,
    });
  }

  if (deleteTvseries.acknowledged) {
    res.status(201).json({
      message: `User [${userToDelete.name}] and related tvseries deleted`,
    });
  }
});

/**
 * @typedef {Object} UserController
 * @property {Function} registerUser - {@link registerUser}
 * @property {Function} verifyToken - {@link verifyToken}
 * @property {Function} verifyUser - {@link verifyUser}
 * @property {Function} loginUser - {@link loginUser}
 * @property {Function} forgotPassword - {@link forgotPassword}
 * @property {Function} verifyPasswordSecret - {@link verifyPasswordSecret}
 * @property {Function} resetPassword - {@link resetPassword}
 * @property {Function} logoutUser - {@link logoutUser}
 * @property {Function} getUserProfile - {@link getUserProfile}
 * @property {Function} updateUserProfile - {@link updateUserProfile}
 * @property {Function} verifyUpdateUserProfile - {@link verifyUpdateUserProfile}
 * @property {Function} deleteUserProfile - {@link deleteUserProfile}
 */

/**
 * @constant
 * User object storing user-related controllers.
 *
 * @type {UserController}
 */
export const userCtrl = {
  registerUser,
  verifyToken,
  verifyUser,
  loginUser,
  forgotPassword,
  verifyPasswordSecret,
  resetPassword,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyUpdateUserProfile,
  deleteUserProfile,
};
