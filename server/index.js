import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection.js";
import routes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

// database connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use("/api/v1/auth", routes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
