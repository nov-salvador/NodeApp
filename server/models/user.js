import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    picturePath: {
      type: String,
      dafualt: "",
    },
    friends: {
      type: Array,
      dafault: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    bio: String,
  },
  {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;