// Third party
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import debug from "debug";
import * as express from "express";
import { ValidationChain, validationResult } from "express-validator";
import passport from "passport";
// Models
import User from "../models/user.js";
// Utility functions
import { validateInput } from "../utility/inputValidation/validationChains.js";

const logger = debug("chat-app:indexController");
const saltLength = 10;

export const signupPost = [
  validateInput("username"),
  validateInput("password"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: await bcryptjs.hash(req.body.password, saltLength),
    });

    if (!errors.isEmpty()) {
      res.status(400).json({
        ...user,
        password: req.body.password,
      });
    } else {
      await user.save();

      res.status(200).json({
        message: "Signup successful",
      });
    }
  }),
];

export const loginPost = [
  passport.authenticate("local"),
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      message: "Login successful",
    });
  }),
];

export const chatGet = asyncHandler(async (req, res, next) => {
  const userList = await User.find().exec();

  res.json(userList);
});
