import express from "express";
import * as userController from "../../../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getUserList);
router.get("/:id", userController.getUser);

export default router;
