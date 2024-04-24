// Third party
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import debug from "debug";
import express from "express";
import passport from "passport";
import { RequestHandler } from "express";
// Models
import User from "../models/user.js";
// Utility functions
import { validateInput } from "../utility/inputValidation/validationChains.js";

const logger = debug("blog-api:indexController");

export const playerListGet = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();

  res.json(users);
});

export const uploadPost: RequestHandler = (req, res) => {
  res.json({ message: "file uploaded" });
};
