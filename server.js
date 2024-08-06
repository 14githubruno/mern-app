import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";

const __dirname = import.meta.dirname;
const dev_mode = process.env.NODE_ENV === "development";
const PORT = process.env.PORT;
const app = express();

import { connectDB } from "./config/connect-db.js";
import { errorHandler } from "./middlewares/error-handler.js";

import userRouter from "./routes/user-routes.js";
import tvSeriesRouter from "./routes/tvseries-routes.js";

app.use(
  cors({
    origin: dev_mode ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL,
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/tvseries", tvSeriesRouter);

if (dev_mode) {
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
