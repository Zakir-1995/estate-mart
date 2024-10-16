import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import imagekit from "../utils/imageKit.js";

export const createListing = async (req, res, next) => {
  const { listingData } = req.body;
  const { images, ...rest } = listingData;

  const allImages = images.map(async (img) => {
    const result = imagekit
      .upload({
        file: img,
        fileName: `product.jpg`,
        folder: "estate-mart",
        isPublished: true,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  });

  const uploadedImages = await Promise.all(allImages);

  let files = [];

  for (let i = 0; i < uploadedImages.length; i++) {
    let file = uploadedImages[i];
    files.push(file.url);
  }
  try {
    const listing = await Listing.create({
      ...rest,
      images: files,
    });
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
