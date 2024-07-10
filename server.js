import dotenv from "dotenv";
dotenv.config();
import express from "express";

import userRouter from "./routes/user-routes.js";

const app = express();

app.use("/api/users", userRouter);

// testing
app.get("/", (req, res) => {
  res.send("Testing express server");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
