import express from "express";
import { tvSeriesCtrl } from "../controllers/tvseries-controllers.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

/* PRIVATE */
router
  .route("/")
  .get(protect, tvSeriesCtrl.getAllTvSeries)
  .post(protect, tvSeriesCtrl.createOneTvSeries);
router
  .route("/:id")
  .patch(protect, tvSeriesCtrl.updateOneTvSeries)
  .delete(protect, tvSeriesCtrl.deleteOneTvSeries);

export default router;
