import express from "express";
import { tvSeriesControllers } from "../controllers/tvseries-controllers";

const router = express.Router();

router
  .route("/")
  .get(tvSeriesControllers.getAllTvSeries)
  .post(tvSeriesControllers.createOneTvSeries);
router
  .route("/:id")
  .patch(tvSeriesControllers.updateOneTvSeries)
  .delete(tvSeriesControllers.deleteOneTvSeries);

export default router;
