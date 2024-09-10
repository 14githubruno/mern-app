import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";
import Symbol from "../models/symbol-model.js";
import { throwError } from "../lib/throw-error.js";
import { isEmpty } from "../lib/check-empty-values.js";
import { generateToken } from "../lib/generate-token.js";
import { decodeToken } from "../lib/decode-token.js";
import { generateSecret } from "../lib/generate-secret.js";
import { hashPassword } from "../lib/hash-password.js";
import { comparePassword } from "../lib/compare-password.js";
import { sendEmail } from "../config/email/send-email.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (isEmpty(req.body)) return throwError(res, 400, "All fiels are required");

  const userExists = await User.findOne({ email });
  if (userExists) return throwError(res, 400, "User already exists");

  const hashed = await hashPassword(res, password);
  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  let symbol;
  if (user) {
    symbol = await Symbol.create({
      user: user._id,
      token: generateToken(res, user._id, "1h"),
      secret: generateSecret(),
    });
  }

  if (user && symbol) {
    res.status(201).json({
      message: `Dear [${user.name}], check your mailbox to verify your akkount`,
      body: {
        _id: user._id,
        name: user.name,
        token: symbol.token,
      },
    });
    sendEmail(
      res,
      email,
      `Verify your email, dear ${user.name}`,
      `Hi, ${user.name}, we need to verify your email.\nSend back this code to verify it: ${symbol.secret}`
    );
  } else {
    return throwError(res, 400, "Dara are not valid");
  }
});

// @desc    verify symbol (verify user)
// @route   GET /api/users/verify/:token || GET /api/users/verify-password-secret/:token || GET /api/users/reset-password/:token || /api/users/profile/verify/:token
// @access  Public
const verifyToken = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const thereIsToken = await Symbol.findOne({ token });

  if (!thereIsToken) {
    return throwError(res, 400, "Token invalid or expired");
  } else {
    res.status(200).json({
      message: "There is token",
    });
  }
});

// @desc    verify symbol (verify user)
// @route   PATCH /api/users/verify/:token
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const { secret } = req.body;
  const token = req.params.token;

  const thereIsToken = await Symbol.findOne({
    token,
    secret,
  });
  if (!thereIsToken)
    return throwError(res, 400, "Secrets do not match or token invalid");

  const decoded = decodeToken(res, token);
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { verified: true } },
    { new: true }
  );

  if (updatedUser) {
    const deleteSymbol = await Symbol.deleteOne({
      token,
      secret,
    });

    if (deleteSymbol.acknowledged) {
      return res.status(200).json({
        message: `Dear ${updatedUser.name}, your email is verified. You kan log in`,
      });
    } else {
      return throwError(
        res,
        "Something went wrong with email verification. Try again"
      );
    }
  } else {
    return throwError(
      res,
      "Something went wrong with email verification. Try again"
    );
  }
});

// @desc    Auth the user and generate token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (isEmpty(req.body)) return throwError(res, 400, "All fiels are required");

  const user = await User.findOne({ email });

  if (!user) return throwError(res, 400, "Credentials are not valid");
  if (!user.verified)
    return throwError(
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
    return throwError(res, 400, "Credentials are not valid");
  }
});

// @desc    send email to restore password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (isEmpty(req.body)) return throwError(res, 400, "All fiels are required");

  const user = await User.findOne({ email });
  if (!user) return throwError(res, 400, "User does not exist");

  let symbol;
  if (user) {
    symbol = await Symbol.create({
      user: user._id,
      token: generateToken(res, user._id, "1h"),
      secret: generateSecret(),
    });
  }

  if (user && symbol) {
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
      `Hi, ${user.name}.\nSend back this code to reset your password: ${symbol.secret}`
    );
  } else {
    return throwError(res, 400, "Data are not valid");
  }
});

// @desc    verify code password
// @route   PATCH /api/users/verify-password-secret/:token
// @access  Public
const verifyPasswordSecret = asyncHandler(async (req, res) => {
  const { secret } = req.body;
  const token = req.params.token;

  const thereIsToken = await Symbol.findOne({
    token,
    secret,
  });
  if (!thereIsToken)
    return throwError(res, 400, "Secrets do not match or token invalid");

  const decoded = decodeToken(res, token);
  const unverifiedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { verified: false } },
    { new: true }
  );

  if (!unverifiedUser) {
    return throwError(res, "Something went wrong. Try again");
  } else {
    thereIsToken.token = generateToken(res, unverifiedUser._id, "1h");
    const updatedToken = await thereIsToken.save();

    if (updatedToken) {
      res.status(201).json({
        message: `Dear [${unverifiedUser.name}], reset now your password to verify your akkount and log in`,
        body: {
          _id: unverifiedUser._id,
          name: unverifiedUser.name,
          token: updatedToken.token,
        },
      });
    } else {
      return throwError(res, "Something went wrong. Try again");
    }
  }
});

// @desc    reset password
// @route   PATCH /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;

  if (isEmpty(req.body)) return throwError(res, 400, "All fiels are required");

  const thereIsToken = await Symbol.findOne({ token });
  if (!thereIsToken)
    return throwError(res, 400, "Secrets do not match or token invalid");

  const decoded = decodeToken(res, token);
  const hashed = await hashPassword(res, password);
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { verified: true, password: hashed } },
    { new: true }
  );

  if (updatedUser) {
    const deleteSymbol = await Symbol.deleteOne({ token });

    if (deleteSymbol.acknowledged) {
      return res.status(200).json({
        message: `Dear ${updatedUser.name}, your password has been reset. You kan now log in`,
      });
    } else {
      return throwError(
        res,
        400,
        "Something went wrong with password reset. Try again"
      );
    }
  } else {
    return throwError(
      res,
      400,
      "Something went wrong with password reset. Try again"
    );
  }
});

// @desc    logout
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: `User [${currentUser.name}] successfully logged out`,
    });
  } catch (error) {
    return throwError(res, "Error logging out");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const thereIsUser = await User.findById(currentUser._id);
  if (!thereIsUser) return throwError(res, 401, "User not found");

  res.status(200).json({
    body: {
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
    },
  });
});

// @desc    Update user data
// @route   PATCH /api/users/profile/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { name, email, password } = req.body;

  if (isEmpty(req.body)) return throwError(res, 400, "All fiels are required");

  const emailAlreadyTaken = await User.findOne({
    email,
    _id: { $ne: currentUser._id },
  });
  if (emailAlreadyTaken)
    return throwError(res, 400, "This email seems already taken");

  let user = await User.findById(currentUser._id);
  if (!user) return throwError(res, 404, "User not found");

  //first check if data have not changed
  const match = await comparePassword(res, password, user.password);
  const dataMatch = match && name === user.name && email === user.email;

  if (dataMatch) return throwError(res, 400, "You did not update any data");

  // update user
  user.name = name;
  user.email = email;
  user.password = await hashPassword(res, password);
  user.verified = false;
  const updatedUser = await user.save();

  let symbol;
  if (updatedUser) {
    symbol = await Symbol.create({
      user: updatedUser._id,
      token: generateToken(res, updatedUser._id, "1h"),
      secret: generateSecret(),
    });
  }

  if (updatedUser && symbol) {
    res.status(201).json({
      message: `Dear [${updatedUser.name}], check your mailbox to update your akkount`,
      body: {
        _id: updatedUser._id,
        name: updatedUser.name,
        token: symbol.token,
      },
    });
    sendEmail(
      res,
      email,
      `Verify your akkount, dear ${updatedUser.name}`,
      `Hi, ${updatedUser.name}.\nSend back this code to verify your akkount and update your data: ${symbol.secret}`
    );
  } else {
    return throwError(res, 400, "Data are not valid");
  }
});

// @desc    verify symbol (verify user)
// @route   PATCH /api/users/profile/verify/:token
// @access  Private
const verifyUpdateUserProfile = asyncHandler(async (req, res) => {
  const { secret } = req.body;
  const token = req.params.token;

  const thereIsToken = await Symbol.findOne({
    token,
    secret,
  });
  if (!thereIsToken)
    return throwError(res, 400, "Secrets do not match or token invalid");

  const decoded = decodeToken(res, token);
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { verified: true } },
    { new: true }
  );

  if (updatedUser) {
    const deleteSymbol = await Symbol.deleteOne({
      token,
      secret,
    });

    if (deleteSymbol.acknowledged) {
      return res.status(200).json({
        message: `Dear ${updatedUser.name}, your akkount is verified and your data are updated`,
      });
    } else {
      return throwError(
        res,
        "Something went wrong with email verification. Try again"
      );
    }
  } else {
    return throwError(
      res,
      "Something went wrong with email verification. Try again"
    );
  }
});

// @desc    Delete user's profile and tvseries
// @route   DELETE /api/users/profile/:id
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const id = req.params.id;

  const userToDelete = await User.findById(id);

  if (!userToDelete) return throwError(res, 401, "User not found");

  if (userToDelete._id.toString() !== currentUser._id.toString()) {
    return throwError(res, 401, "User not authorized");
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
