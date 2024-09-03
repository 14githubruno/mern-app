import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";
import Token from "../models/token-verification-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/generate-token.js";
import { sendEmail } from "../config/email/send-email.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    res.status(400);
    throw new Error("Something went wrong. Try again");
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  let token;
  if (user) {
    token = await Token.create({
      user: user._id,
      token: generateToken(user._id, "1h"),
    });
  }

  if (user && token) {
    res.status(201).json({
      message: `User [${user.name}] created`,
      body: {
        _id: user._id,
        name: user.name,
      },
    });
    sendEmail(
      email,
      `Verify your email, dear ${name}`,
      `Hi, ${name}, we need to verify your email. Click on this link to verify it: ${process.env.BASE_URL}/verify/${token.token}`
    );
  } else {
    res.status(400);
    throw new Error("Data are not valid");
  }
});

// @desc    Verify User
// @route   GET /api/users/verify
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const thereIsToken = await Token.findOne({ token: req.params.token });

  if (!thereIsToken) {
    res.status(400);
    throw new Error("Ops, token does not exist or has expired");
  }

  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
  const userToVerify = await User.findById(decoded._id);

  if (!userToVerify) {
    res.status(500);
    throw new Error("Something went wrong. Try again");
  }

  userToVerify.verified = true;
  const updatedUser = await userToVerify.save();

  if (updatedUser) {
    const deleteToken = await Token.deleteOne({ token: req.params.token });

    if (deleteToken.acknowledged) {
      return res.status(200).json({
        message: `Dear ${updatedUser.name}, your email is verified. You kan log in`,
      });
    } else {
      res.status(500);
      throw new Error(
        "Something went wrong with email verification. Try again"
      );
    }
  } else {
    res.status(500);
    throw new Error("Something went wrong with email verification. Try again");
  }
});

// @desc    Auth the user and generate token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Credentials are not valid");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (user && passwordsMatch) {
    const token = generateToken(user._id, "3d");
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
          tokenExpirationDate: Date.now() + cookieMaxAge,
        },
      });
  } else {
    res.status(400);
    throw new Error("Credentials are not valid");
  }
});

// @desc    logout
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: `User [${req.user.name}] successfully logged out`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out user" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userLoggedIn = req.user;

  const thereIsUser = await User.findById(userLoggedIn._id);
  if (!thereIsUser) {
    res.status(401);
    throw new Error("User not found");
  }

  res.status(200).json({
    body: {
      _id: userLoggedIn._id,
      name: userLoggedIn.name,
      email: userLoggedIn.email,
    },
  });
});

// @desc    Update user data
// @route   PATCH /api/users/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const emailAlreadyTaken = await User.findOne({
    email,
    _id: { $ne: currentUser._id },
  });
  if (emailAlreadyTaken) {
    res.status(400);
    throw new Error("This email seems already taken");
  }

  let userToUpdate = await User.findById(currentUser._id);

  if (!userToUpdate) {
    res.status(404);
    throw new Error("User not found");
  }

  if (userToUpdate) {
    //first check if data have not changed
    const passwordsMatch = await bcrypt.compare(
      password,
      userToUpdate.password
    );
    const namesMatch = name === userToUpdate.name;
    const emailsMatch = email === userToUpdate.email;
    if (passwordsMatch && namesMatch && emailsMatch) {
      res.status(400);
      throw new Error("You did not update any data");
    }

    //create updated user
    userToUpdate.name = name;
    userToUpdate.email = email;
    userToUpdate.password = await bcrypt.hash(password, 10);

    const updatedUser = await userToUpdate.save();
    if (updatedUser) {
      res.status(200).json({
        message: `User [${updatedUser.name}] updated`,
        body: {
          name: updatedUser.name,
        },
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong. Try again");
    }
  }
});

// @desc    Delete user's profile and tvseries
// @route   DELETE /api/users/:id
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const userToDelete = await User.findById(req.params.id);

  if (!userToDelete) {
    res.status(401);
    throw new Error("User not found");
  }

  if (userToDelete._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const userTvseries = await Tvseries.find({
    user: userToDelete._id,
  });

  const deletedUser = await User.deleteOne(userToDelete);
  if (deletedUser.acknowledged && userTvseries.length === 0) {
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

export const userControllers = {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
