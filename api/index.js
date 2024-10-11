import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
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
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
