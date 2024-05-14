import express from "express";
import * as indexController from "../../../controllers/indexController.js";

const router = express.Router();

router.post("/signup", indexController.signupPost);
router.post("/login", indexController.loginPost);
router.post("/logout", indexController.logoutPost);

export default router;
