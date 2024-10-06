import listingModel from "../models/listingModels.js";

export const createListing = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "Atleast One Image is required" });

    if (req.files.length > 6) {
      return res.status(404).send({
        success: false,
        message: "You cannot upload more than 6 images",
      });
    }

    const imageUrlArray = req.files.map((file) => file.path);
    const {
      name,
      description,
      address,
      regularPrices,
      discountedPrice,
      baths,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
    } = req.body;

    // Create the listing
    const newListing = new listingModel({
      name,
      description,
      address,
      regularPrices,
      discountedPrice,
      baths,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      images: imageUrlArray,
      userRef: req.user._id,
    });

    await newListing.save();

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing: newListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userListings = await listingModel.find({ userRef: id });
    if (userListings) {
      return res.status(200).send({
        success: true,
        message: "Fetch user listings successfully",
        userListings,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No Listing found for this user",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getListByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await listingModel.findById(id);
    if (!list) {
      return res.status(404).send({
        success: false,
        message: "list not fetched",
      });
    }
    return res.status(200).send({
      success: true,
      message: "list fetched successfully",
      list,
    });
  } catch (error) {
    next(error);
  }
};
