import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = import.meta.dirname;
const IS_DEV_MODE = process.env.NODE_ENV === "development";
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const app = express();

import { connectDB } from "./config/connect-db.js";
import { errorHandler } from "./middlewares/error-handler.js";

import userRouter from "./routes/user-routes.js";
import tvSeriesRouter from "./routes/tvseries-routes.js";

app.use(
  cors({
    origin: BASE_URL,
    credentials: true,
  })
);

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
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
  );
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
