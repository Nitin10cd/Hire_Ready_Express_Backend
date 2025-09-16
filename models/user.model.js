import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  phone: String,
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  qualification: String,
  github: String,
  linkedin: String,
  passwordHash: {
    type: String,
    required: true,
  },
  subscription: {
    exists: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["free", "team", "business"],
      default: "free",
    },
    validity: Date,
  },
  access_token: String,
  refresh_token: String,
  twoFactorString: {
    type: String,
  }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
