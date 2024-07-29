// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("No name has been provided");
  }
  res.status(201).json({
    message: "user created",
  });
};

// @desc    Auth the user and generate token
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.status(200).json({
    message: "user logged in",
  });
};

// @desc    logout
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  res.status(200).json({
    message: "user logged out",
  });
};

export const userControllers = { registerUser, loginUser, logoutUser };
