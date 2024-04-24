// Third party
import express from "express";
// Routers
import indexRouter from "./api/index/index.js";

const router = express.Router();

router.use("/", indexRouter);

export default router;
