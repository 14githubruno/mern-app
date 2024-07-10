import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

// testing
app.get("/", (req, res) => {
  res.send("Testing express server");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
