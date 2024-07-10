// @desc    Get all tv series
// @route   GET /api/tvseries
// @access  Private
const getAllTvSeries = (req, res) => {
  res.status(200).json({
    message: "these are all your tv series",
  });
};

// @desc    Create a tv series
// @route   POST /api/tvseries
// @access  Private
const createOneTvSeries = (req, res) => {
  res.status(201).json({
    message: "the tv series has been created",
  });
};

// @desc    Update a tv series
// @route   PATCH /api/tvseries/:id
// @access  Private
const updateOneTvSeries = (req, res) => {
  res.status(200).json({
    message: "the tv series has been updated",
  });
};

// @desc    Delete a tv series
// @route   DELETE /api/tvseries/:id
// @access  Private
const deleteOneTvSeries = (req, res) => {
  res.status(201).json({
    message: "the tv series has been deleted",
  });
};

export const tvSeriesControllers = {
  getAllTvSeries,
  createOneTvSeries,
  updateOneTvSeries,
  deleteOneTvSeries,
};
