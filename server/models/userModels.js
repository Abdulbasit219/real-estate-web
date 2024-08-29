import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
        type: Number,
        default: 0
    }
  },
  { timestamps: true }
);

const UserSchema = mongoose.model('real-estate', User);

export default UserSchema;