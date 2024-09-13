import User from "../models/user-model.js";

// Note: this middleware will run periodically as a cron job (see server.js)

const deleteUnveriedUsers = async (req, res, next) => {
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
