import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { connectDB } from "./config/connect-db.js";
import { errorHandler } from "./middlewares/error-handler.js";

import userRouter from "./routes/user-routes.js";
import tvSeriesRouter from "./routes/tvseries-routes.js";

const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_BASE_URL
        : process.env.PROD_BASE_URL,
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/tvseries", tvSeriesRouter);

app.get("/", (req, res) => {
  res.send("Testing express server");
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
