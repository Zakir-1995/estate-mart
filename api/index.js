import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


// connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// routes
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
