import express from "express";
import { userCtrl } from "../controllers/user-controllers.js";
import { protect } from "../middlewares/protect.js";
import { limiter } from "../middlewares/limiter.js";

const router = express.Router();

/* PUBLIC */
router
  .route("/register")
  .post(limiter, userCtrl.registerUser);
router
  .route("/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(limiter, userCtrl.verifyUser);
router
  .route("/login")
  .post(limiter, userCtrl.loginUser);
router
  .route("/forgot-password")
  .post(limiter, userCtrl.forgotPassword);
router
  .route("/verify-password-secret/:token")
  .get(userCtrl.verifyToken)
  .patch(limiter, userCtrl.verifyPasswordSecret);
router
  .route("/reset-password/:token")
  .get(userCtrl.verifyToken)
  .patch(limiter, userCtrl.resetPassword);

/* PRIVATE */
router
  .route("/logout")
  .post(protect, limiter, userCtrl.logoutUser);
router
  .route("/profile")
  .get(protect, userCtrl.getUserProfile);
router
  .route("/profile/:id")
  .patch(protect, limiter, userCtrl.updateUserProfile)
  .delete(protect, limiter, userCtrl.deleteUserProfile);
router
  .route("/profile/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(protect, limiter, userCtrl.verifyUpdateUserProfile);

export default router;
