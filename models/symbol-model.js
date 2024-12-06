// pkgs
import mongoose from "mongoose";

const symbolSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  token: {
    type: String,
    required: true,
  },

  secret: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // 15 minutes
  },
});

export default mongoose.model("Symbol", symbolSchema);
