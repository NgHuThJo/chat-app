import express from "express";
import * as chatController from "../../../controllers/chatController.js";

const router = express.Router();

router.get("/", chatController.chatGet);

export default router;
