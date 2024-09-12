import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";
import { throwError } from "../lib/throw-error.js";
import { validate } from "../lib/validate-req-body.js";

// @desc    Get all tv series
// @route   GET /api/tvseries
// @access  Private
const getAllTvSeries = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const tvSeries = await Tvseries.find({ user: currentUser._id });
  const thereAreTvSeries = tvSeries.length > 0;

  if (thereAreTvSeries) {
    res.status(200).json({
      message: `These are your tv series, [${currentUser.name}]`,
      body: tvSeries,
    });
  } else {
    res.status(200).json({
      message: `Unfortunately, [${currentUser.name}], you have no tv series yet. Kreate them`,
      body: [],
    });
  }
});

// @desc    get one tv series
// @route   GET /api/tvseries/:id/:title
// @access  Private
const getOneTvseries = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const { id, title } = req.params;

  const tvseries = await Tvseries.findOne({ _id: id, title });
  if (!tvseries)
    throwError(res, 404, `Tv series with title [${title}] not found`);

  const authorizedUser = await User.findById(currentUser._id);
  if (!authorizedUser) throwError(res, 401, "User not authorized");

  if (tvseries.user.toString() !== authorizedUser._id.toString()) {
    throwError(res, 401, "User not authorized");
  }

  res.status(200).json({
    message: `Tv series with title [${tvseries.title}] sent`,
    body: tvseries,
  });
});

// @desc    Create a tv series
// @route   POST /api/tvseries
// @access  Private
const createOneTvSeries = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  const parsedData = await validate(res, "create-tvseries", req.body);
  const { title, stars, image, note } = parsedData;

  const authorizedUser = await User.findById(currentUser._id);
  if (!authorizedUser) throwError(res, 401, "User not authorized");

  const tvSeriesExists = await Tvseries.find({
    title: title,
    user: authorizedUser._id,
  });

  if (tvSeriesExists.length === 1) {
    throwError(
      res,
      400,
      `Tv series with title [${title}] already exists, dear [${authorizedUser.name}]`
    );
  } else {
    const newTvSeries = await Tvseries.create({
      user: currentUser._id,
      title,
      stars,
      image,
      note,
    });
    if (newTvSeries) {
      res.status(201).json({
        message: `Tv series with title [${newTvSeries.title}] created`,
        body: newTvSeries,
      });
    }
  }
});

// @desc    Update a tv series
// @route   PATCH /api/tvseries/:id
// @access  Private
const updateOneTvSeries = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const id = req.params.id;

  const parsedData = await validate(res, "update-tvseries", req.body);
  const { title, stars, image, note } = parsedData;

  const tvSeriesToUpdate = await Tvseries.findById(id);
  if (!tvSeriesToUpdate)
    throwError(res, 400, `Tv series with ID [${id}] not found`);

  const authorizedUser = await User.findById(currentUser._id);
  if (!authorizedUser) throwError(res, 401, "User not authorized");

  if (tvSeriesToUpdate.user.toString() !== authorizedUser._id.toString()) {
    throwError(res, 401, "User not authorized");
  }

  tvSeriesToUpdate.title = title || tvSeriesToUpdate.title;
  tvSeriesToUpdate.stars = stars || tvSeriesToUpdate.stars;
  tvSeriesToUpdate.image = image || tvSeriesToUpdate.image;
  tvSeriesToUpdate.note = note || tvSeriesToUpdate.note;

  const updatedTvSeries = await tvSeriesToUpdate.save();
  if (updatedTvSeries) {
    res.status(200).json({
      message: `Tv series with title [${updatedTvSeries.title}] updated`,
      body: updatedTvSeries,
    });
  }
});

// @desc    Delete a tv series
// @route   DELETE /api/tvseries/:id
// @access  Private
const deleteOneTvSeries = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const id = req.params.id;

  const tvSeriesToDelete = await Tvseries.findById(id);
  if (!tvSeriesToDelete)
    throwError(res, 400, `Tv series with ID [${id}] not found`);

  const authorizedUser = await User.findById(currentUser._id);
  if (!authorizedUser) throwError(res, 401, "User not authorized");

  if (tvSeriesToDelete.user.toString() !== authorizedUser._id.toString()) {
    throwError(res, 401, "User not authorized");
  }

  const deleteTvSeries = await Tvseries.deleteOne(tvSeriesToDelete);
  if (deleteTvSeries.acknowledged) {
    res.status(201).json({
      message: `Tv series with title [${tvSeriesToDelete.title}] deleted`,
      body: tvSeriesToDelete,
    });
  }
});

export const tvSeriesCtrl = {
  getAllTvSeries,
  getOneTvseries,
  createOneTvSeries,
  updateOneTvSeries,
  deleteOneTvSeries,
};
