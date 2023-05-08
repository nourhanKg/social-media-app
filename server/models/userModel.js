import mongoose from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      max: 50,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Passsword is required"],
      min: 4,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
