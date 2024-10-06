import express from "express";
import {
  deleteUser,
  updateUserController,
} from "../controller/userController.js";
import { verifyUser } from "../utils/VerifyUsers.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateUserController);

router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
