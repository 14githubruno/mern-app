// pkgs
import mongoose from "mongoose";

const pseudoUserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // 15 minutes
  },
});

export default mongoose.model("PseudoUser", pseudoUserSchema);
