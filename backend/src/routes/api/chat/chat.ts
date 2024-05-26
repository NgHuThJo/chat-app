import express from "express";
import * as chatController from "../../../controllers/chatController.js";

const router = express.Router();

router.get("/:userId", chatController.getChatRooms);
router.post("/room", chatController.createChatRoom);

export default router;
