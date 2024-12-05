// pkgs
import express from "express";

// controllers obj
import { tvSeriesCtrl } from "../controllers/tvseries-controllers.js";

// middlewares
import { protect } from "../middlewares/protect.js";
import { limiter } from "../middlewares/limiter.js";

const router = express.Router();

/* PRIVATE */
router
  .route("/")
  .get(protect, tvSeriesCtrl.getAllTvSeries)
  .post(protect, limiter, tvSeriesCtrl.createOneTvSeries);
router
  .route("/:id")
  .patch(protect, limiter, tvSeriesCtrl.updateOneTvSeries)
  .delete(protect, limiter, tvSeriesCtrl.deleteOneTvSeries);
router
  .route("/:id/:title")
  .get(protect, tvSeriesCtrl.getOneTvseries)

export default router;
