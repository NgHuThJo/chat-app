import express from "express";
import * as indexController from "../../../controllers/indexController.js";

const router = express.Router();

router.get("/chat", indexController.chatGet);
router.get("/user/:id", indexController.userGet);
router.post("/login", indexController.loginPost);
router.post("/signup", indexController.signupPost);

export default router;
