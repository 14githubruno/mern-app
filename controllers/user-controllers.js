import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/generate-token.js";

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

  if (user) {
    res.status(201).json({
      message: `User [${user.name}] created`,
      body: {
        _id: user._id,
        name: user.name,
      },
    });
  } else {
    res.status(400);
    throw new Error("Data are not valid");
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
    res.status(200).json({
      message: `User [${user.name}] is logged in`,
      body: {
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
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
const logoutUser = (req, res) => {
  res.status(200).json({
    message: `User [${req.user.name}] successfully logged out`,
  });
};

export const userControllers = { registerUser, loginUser, logoutUser };
