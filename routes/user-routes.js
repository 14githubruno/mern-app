import express from "express";
import { userControllers } from "../controllers/user-controllers.js";

const router = express.Router();

router.route("/").post(userControllers.registerUser);
router.route("/login").post(userControllers.loginUser);
router.route("/logout").post(userControllers.logoutUser);

export default router;
