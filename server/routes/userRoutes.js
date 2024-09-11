import express from "express";
import { updateUserController } from "../controller/userController.js";
import { verifyUser } from "../utils/VerifyUsers.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateUserController);

export default router;
