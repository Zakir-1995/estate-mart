import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
    try {
      const listing = await Listing.create(req.body)
    return res.status(201).json({
      message: "New listing created!",
      error: false,
      success: true,
      data: listing,
    });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};
