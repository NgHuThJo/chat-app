// Third party
import asyncHandler from "express-async-handler";
import debug from "debug";
import * as express from "express";
// Models
import User from "../models/user.js";

const logger = debug("chat-app:userController");

export const userGet = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const { password, ...payload } = user._doc;

  res.json(payload);
});
