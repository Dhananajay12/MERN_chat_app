const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, reuired: true },
    email: { type: String, reuired: true, unique: true },
    password: { type: String, reuired: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
