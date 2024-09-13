import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import cron from "node-cron";
import helmet from "helmet";
import compression from "compression";

import { connectDB } from "./config/db/connect-db.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { deleteUnveriedUsers } from "./middlewares/delete-unverified-users.js";

import userRouter from "./routes/user-routes.js";
import tvSeriesRouter from "./routes/tvseries-routes.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { NODE_ENV, PORT, BASE_URL } = process.env;
const IS_DEV_MODE = NODE_ENV === "development";

const __dirname = import.meta.dirname;

const app = express();
app.set("trust proxy", 3);

app.use(
  cors({
    origin: BASE_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/tvseries", tvSeriesRouter);

if (IS_DEV_MODE) {
  console.log("development mode");
  app.get("/", (req, res) => {
    res.send("Testing express server");
  });
} else {
  console.log("production mode");
  app.use(express.static(path.join(__dirname, "client", "dist")));
  app.get("/ip", (req, res) => console.log("GET IP", req.ip));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
  );
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

cron.schedule("0 0 * * *", deleteUnveriedUsers);
