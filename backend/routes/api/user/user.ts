import express from "express";
import * as userController from "../../../controllers/userController.js";

const router = express.Router();

router.get("/user/:id", userController.userGet);

export default router;
