import express from "express";
import { userCtrl } from "../controllers/user-controllers.js";
import { protectRoute } from "../middlewares/protect-route.js";

const router = express.Router();

/* PUBLIC */
router.route("/register").post(userCtrl.registerUser);
router
  .route("/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.verifyUser);
router.route("/login").post(userCtrl.loginUser);
router.route("/forgot-password").post(userCtrl.forgotPassword);
router
  .route("/verify-password-secret/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.verifyPasswordSecret);
router
  .route("/reset-password/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.resetPassword);

/* PRIVATE */
router.route("/logout").post(protectRoute, userCtrl.logoutUser);
router.route("/profile").get(protectRoute, userCtrl.getUserProfile);
router
  .route("/profile/:id")
  .patch(protectRoute, userCtrl.updateUserProfile)
  .delete(protectRoute, userCtrl.deleteUserProfile);
router
  .route("/profile/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(protectRoute, userCtrl.verifyUpdateUserProfile);

export default router;
