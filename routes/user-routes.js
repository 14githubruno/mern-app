import express from "express";
import { userControllers } from "../controllers/user-controllers.js";
import { protectRoute } from "../middlewares/protect-route.js";

const router = express.Router();

router.route("/register").post(userControllers.registerUser);
router
  .route("/verify/:token")
  .get(userControllers.verifyToken)
  .patch(userControllers.verifyUser);
router.route("/login").post(userControllers.loginUser);
router.route("/forgot-password").post(userControllers.forgotPassword);
router
  .route("/verify-password-secret/:token")
  .get(userControllers.verifyToken)
  .patch(userControllers.verifyPasswordSecret);
router
  .route("/reset-password/:token")
  .get(userControllers.verifyToken)
  .patch(userControllers.resetPassword);
router.route("/logout").post(protectRoute, userControllers.logoutUser);
router.route("/profile").get(protectRoute, userControllers.getUserProfile);
router
  .route("/:id")
  .patch(protectRoute, userControllers.updateUserProfile)
  .delete(protectRoute, userControllers.deleteUserProfile);

export default router;
