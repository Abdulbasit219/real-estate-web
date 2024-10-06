import express from "express";
import { createListing, getListByID, getUserListingById } from "../controller/listing.js";
import cloudinaryfileUpload from "../middleware/fileUploader.js";
import { verifyUser } from "../utils/VerifyUsers.js";

const router = express.Router();

router.post(
  "/create",
  verifyUser,
  cloudinaryfileUpload.array("images"),
  createListing
);

router.get('/getListing/:id', getUserListingById );

router.get('/getList/:id', getListByID );

export default router;
