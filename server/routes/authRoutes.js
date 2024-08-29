import express from "express";
import { loginController, registerController } from "../controller/auth.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
