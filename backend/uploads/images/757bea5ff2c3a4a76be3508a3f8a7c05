import express from "express";
import multer from "multer";
import * as indexController from "../../../controllers/indexController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/images/" });

router.get("/playerlist", indexController.playerListGet);

router.post("/upload", upload.array("files"), indexController.uploadPost);

export default router;
