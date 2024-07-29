import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";

// @desc    Get all tv series
// @route   GET /api/tvseries
// @access  Private
const getAllTvSeries = asyncHandler(async (req, res) => {
  const tvSeries = await Tvseries.find({ user: req?.user?._id });
  const thereAreTvSeries = tvSeries.length > 0;

  if (thereAreTvSeries) {
    res.status(200).json({
      message: `These are your tv series, [${req.user.name}]`,
      body: tvSeries,
    });
  } else {
    res.status(401).json({
      message: `Unfortunately, [${req.user.name}], you have no tv series yet. Create them`,
    });
  }
});

// @desc    Create a tv series
// @route   POST /api/tvseries
// @access  Private
const createOneTvSeries = asyncHandler(async (req, res) => {
  const { title, stars, image, note } = req.body;
  if (!title || !stars || !image || !note) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (stars > 5 || stars < 1) {
    res.status(400);
    throw new Error("Number of stars must be between 1 and 5");
  }

  const authorizedUser = await User.findById(req?.user?._id);
  if (!authorizedUser) {
    res.status(401);
    throw new Error("User not found");
  }

  const tvSeriesExists = await Tvseries.find({
    title: title,
    user: authorizedUser._id,
  });

  if (tvSeriesExists.length === 1) {
    res.status(400);
    throw new Error(
      `Tv series with title [${title}] already exists, dear [${authorizedUser.name}]`
    );
  } else {
    const newTvSeries = await Tvseries.create({
      user: req?.user?._id,
      title,
      stars,
      image,
      note,
    });
    res.status(201).json({
      message: `Tv series with title [${newTvSeries.title}] created`,
      body: newTvSeries,
    });
  }
});

// @desc    Update a tv series
// @route   PATCH /api/tvseries/:id
// @access  Private
const updateOneTvSeries = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "the tv series has been updated",
  });
});

// @desc    Delete a tv series
// @route   DELETE /api/tvseries/:id
// @access  Private
const deleteOneTvSeries = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "the tv series has been deleted",
  });
});

export const tvSeriesControllers = {
  getAllTvSeries,
  createOneTvSeries,
  updateOneTvSeries,
  deleteOneTvSeries,
};
