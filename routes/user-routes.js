import express from "express";
import { userControllers } from "../controllers/user-controllers.js";
import { protectRoute } from "../middlewares/protect-route.js";

const router = express.Router();

router.route("/register").post(userControllers.registerUser);
router.route("/login").post(userControllers.loginUser);
router.route("/logout").post(protectRoute, userControllers.logoutUser);

export default router;
