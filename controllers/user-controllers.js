import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userLoggedIn = req.user;
  console.log(userLoggedIn);
  const userAuthorized = await User.findById(userLoggedIn._id);
  if (!userAuthorized) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json({
    message: `User [${userLoggedIn.name}], these are your data`,
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
          token: generateToken(updatedUser._id),
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
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
