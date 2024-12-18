// pkgs
import express from "express";

// controllers obj
import { userCtrl } from "../controllers/user-controllers.js";

// middlewares
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
  .route("/logout")
  .post(userCtrl.logoutUser);
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
router
  .route("/refresh")
  .get(userCtrl.refreshToken)


/* PRIVATE */
router
  .route("/profile")
  .get(protect, userCtrl.getUserProfile)
  .post(protect, limiter, userCtrl.updateUserProfile)
router
  .route("/profile/:id")
  .delete(protect, limiter, userCtrl.deleteUserProfile);
router
  .route("/profile/verify/:token")
  .get(userCtrl.verifyToken)
  .patch(protect, limiter, userCtrl.verifyUpdateUserProfile);

export default router;
