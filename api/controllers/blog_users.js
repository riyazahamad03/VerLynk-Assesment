const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
require("dotenv").config();

exports.signup_user = async (req, res, next) => {
  // {
  //     "email" : "hellohello@gmail.com",
  //     "password":"xyz",
  //     "userName" : "riyaz"
  // }
  try {
    const existing_user = await User.find({
      email: req.body.email,
    }).exec();

    if (existing_user.length > 0) {
      return res.status(409).json({
        error: "User already exists",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      userName: req.body.userName,
      password: hash,
    });
    const result = await user.save();
    console.log(result);
    return res.status(201).json({
      message: "User created",
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({
      error: "Failed to signup",
      error: err,
    });
  }
};

exports.login_user = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      res.status(401).json({
        message: "Authentication Failed",
      });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
        userName: user.userName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Auth Success",
      token: token,
      id: user._id,
      det: user,
    });
  } catch (err) {
    console.log("Error in authentication");
    res.status(500).json({
      error: "Error logging in ",
    });
  }
};
