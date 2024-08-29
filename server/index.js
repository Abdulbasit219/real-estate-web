import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection.js";
import routes from "./routes/authRoutes.js";

const app = express();

dotenv.config();

// database connection
connectDB();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/api/v1/auth', routes)

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
