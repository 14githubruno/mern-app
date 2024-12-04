// db models
import User from "../models/user-model.js";

/**
 * @async
 * @function
 * To be run as cron job to delete unverified users.
 *
 * (See {@link server.js})
 *
 * @returns {void}
 */
const deleteUnveriedUsers = async () => {
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
};

export { deleteUnveriedUsers };
