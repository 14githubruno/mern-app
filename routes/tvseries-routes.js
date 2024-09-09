import express from "express";
import { tvSeriesCtrl } from "../controllers/tvseries-controllers.js";
import { protectRoute } from "../middlewares/protect-route.js";

const router = express.Router();

/* PRIVATE */
router
  .route("/")
  .get(protectRoute, tvSeriesCtrl.getAllTvSeries)
  .post(protectRoute, tvSeriesCtrl.createOneTvSeries);
router
  .route("/:id")
  .patch(protectRoute, tvSeriesCtrl.updateOneTvSeries)
  .delete(protectRoute, tvSeriesCtrl.deleteOneTvSeries);

export default router;
