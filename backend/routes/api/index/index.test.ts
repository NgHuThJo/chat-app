// Third party
import debug from "debug";
import express from "express";
import {
  disconnectMongoServer,
  initializeMongoServer,
} from "../../../mongoConfigTesting.js";
import mongoose from "mongoose";
import request from "supertest";
// Collections
import User from "../../../models/user.js";
// Router
import indexRouter from "./index.js";

const logger = debug("wheres-waldo:index:test");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

// Mock user data
const fakeData = [
  {
    username: "Johnny Doe",
    password: "password",
  },
  {
    username: "Jane Doe",
    password: "password",
  },
];

describe("test index routes", () => {
  beforeAll(async () => {
    await initializeMongoServer();

    // Save fake user in data base
    try {
      for (let userData of fakeData) {
        const newUser = new User(userData);
        await newUser.save();
      }
    } catch (err) {
      logger(err);
    }
  });

  afterAll(async () => {
    await disconnectMongoServer();
  });

  describe("post /signup", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .post("/signup")
        .type("form")
        .field("username", "Johnny Doe")
        .field("password", "password");

      expect(response.status).toEqual(200);
    });
  });

  describe("post /upload", () => {
    it("should return status code 200", async () => {});
  });
});
