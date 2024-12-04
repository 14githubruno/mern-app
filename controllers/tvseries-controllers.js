// pkgs
import asyncHandler from "express-async-handler";

// db models
import User from "../models/user-model.js";
import Tvseries from "../models/tvseries-model.js";

// lib
import { throwError } from "../lib/throw-error.js";
import { validate } from "../lib/validate-req-body.js";

/**
 * @async
 * @function
 * Controller to get all tvseries from db
 *
 * GET /api/tvseries
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

/**
 * @async
 * @function
 * Controller to get one tv series from db
 *
 * GET /api/tvseries/:id/:title
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

/**
 * @async
 * @function
 * Controller to create a tv series
 *
 * POST /api/tvseries
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

/**
 * @async
 * @function
 * Controller to update a tv series
 *
 * PATCH /api/tvseries/:id
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

/**
 * @async
 * @function
 * Controller to delete a tv series
 *
 * DELETE /api/tvseries/:id
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

/**
 * @typedef {Object} TvseriesController
 * @property {Function} getAllTvSeries - {@link getAllTvSeries}
 * @property {Function} getOneTvseries - {@link getOneTvseries}
 * @property {Function} createOneTvSeries - {@link createOneTvSeries}
 * @property {Function} updateOneTvSeries - {@link updateOneTvSeries}
 * @property {Function} deleteOneTvSeries - {@link deleteOneTvSeries}
 */

/**
 * @constant
 * Tvseries object storing tvseries-related controllers.
 *
 * @type {TvseriesController}
 */
export const tvSeriesCtrl = {
  getAllTvSeries,
  getOneTvseries,
  createOneTvSeries,
  updateOneTvSeries,
  deleteOneTvSeries,
};
