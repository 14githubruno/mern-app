import express from "express";
import { tvSeriesControllers } from "../controllers/tvseries-controllers.js";
import { protectRoute } from "../middlewares/protect-route.js";

const router = express.Router();

/* PRIVATE */
router
  .route("/")
  .get(protectRoute, tvSeriesControllers.getAllTvSeries)
  .post(protectRoute, tvSeriesControllers.createOneTvSeries);
router
  .route("/:id")
  .patch(protectRoute, tvSeriesControllers.updateOneTvSeries)
  .delete(protectRoute, tvSeriesControllers.deleteOneTvSeries);

export default router;
