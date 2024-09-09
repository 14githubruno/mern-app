import express from "express";
import { userCtrl } from "../controllers/user-controllers.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

/* PUBLIC */
router
  .route("/register")
  .post(userCtrl.registerUser);
router
  .route("/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.verifyUser);
router
  .route("/login")
  .post(userCtrl.loginUser);
router
  .route("/forgot-password")
  .post(userCtrl.forgotPassword);
router
  .route("/verify-password-secret/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.verifyPasswordSecret);
router
  .route("/reset-password/:token")
  .get(userCtrl.verifyToken)
  .patch(userCtrl.resetPassword);

/* PRIVATE */
router
  .route("/logout")
  .post(protect, userCtrl.logoutUser);
router
  .route("/profile")
  .get(protect, userCtrl.getUserProfile);
router
  .route("/profile/:id")
  .patch(protect, userCtrl.updateUserProfile)
  .delete(protect, userCtrl.deleteUserProfile);
router
  .route("/profile/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(protect, userCtrl.verifyUpdateUserProfile);

export default router;
