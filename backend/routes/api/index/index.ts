import express from "express";
import * as indexController from "../../../controllers/indexController.js";

const router = express.Router();

router.post("/login", indexController.loginPost);
router.post("/signup", indexController.signupPost);
router.get("/chat", indexController.chatGet);

export default router;
