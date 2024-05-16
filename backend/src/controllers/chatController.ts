// Third party
import asyncHandler from "express-async-handler";
import debug from "debug";
import * as express from "express";
// Models
import User from "../models/user.js";

const logger = debug("chat-app:chatController");

export const chatGet = asyncHandler(async (req, res, next) => {
  const userList = await User.find().exec();

  res.json(userList);
});
