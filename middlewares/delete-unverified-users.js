import User from "../models/user-model.js";

/**
 * @typedef {Function} ExpressNextFunction
 *
 * @async
 * @function
 * Middleware to be run as cron job to delete unverified users.
 *
 * (See {@link server.js})
 *
 * @param {ExpressNextFunction} next - Function to call the next middleware.
 *
 * @returns {void}
 */
const deleteUnveriedUsers = async (next) => {
  try {
    const deletedUsers = await User.deleteMany({ verified: false });

    if (deletedUsers.acknowledged) {
      console.log(`Unverified users deleted: ${deletedUsers.deletedCount}`);
    } else {
      console.log("All users are verified");
    }
  } catch (err) {
    console.log("Error deleting unverified users:", err);
  }
  next();
};

export { deleteUnveriedUsers };
