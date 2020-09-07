const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true, //removing spaces before and after content
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [7, "password is to short"],
  },
});

//chacking if a user update filed is valid, returns fals is an unvalid filed was entered
userSchema.statics.isValidUpdate = (updates) => {
  const allowedUpdates = ["email", "password"]; //all valid fileds to update
  const isValidOperetion = updates.every((update) =>
    allowedUpdates.includes(update)
  ); //will be true if onle EVERY string in the updates array is included in allowedUpdates
  return isValidOperetion;
};

//generating user authentication token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

//user login
userSchema.statics.findByCredentials = async (email, password) => {
  //look for user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("לא ניתן להתחבר");
  }

  //is was found by email, chack if password is like on the db
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("לא ניתן להתחבר");
  }

  return user;
};

//hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;
  //if thar is a new password(by creating or updaing), hash it:
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  //when we done, not gonne save the user if not called
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
