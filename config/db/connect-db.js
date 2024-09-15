import mongoose from "mongoose";

/**
 * @async
 * @function
 * Connects app to db.
 *
 * @returns {Promise<void>} Resolves when the connection is successful, or rejects with an error.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export { connectDB };
