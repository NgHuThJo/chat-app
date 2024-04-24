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
    score: 100,
  },
  {
    username: "Jane Doe",
    score: 120,
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

  describe("get /playerlist", () => {
    it("should return status code 200", async () => {
      const response = await request(app).get("/playerlist");

      expect(response.status).toEqual(200);

      response.body.forEach((element: object) => {
        expect(element).toMatchObject({
          username: expect.any(String),
          score: expect.any(Number),
        });
      });
    });
  });

  describe("post /upload", () => {
    it("should return status code 200", async () => {
      // file path for attach() must be relative to the current working directory
      const response = await request(app)
        .post("/upload")
        .field("name", "John Doe")
        .attach("files", "./routes/api/index/index.ts");

      expect(response.status).toEqual(200);
    });
  });
});
