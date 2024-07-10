// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  res.send("register user");
};

// @desc    Auth the user and generate token
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.send("login user");
};

// @desc    logout
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  res.send("logout user");
};

export const userControllers = { registerUser, loginUser, logoutUser };
