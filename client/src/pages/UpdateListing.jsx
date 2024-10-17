import { useState } from "react";
import imageToBase64 from "../helper/imageToBase64";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [listingImage, setListingImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState(false);

  const handleListingImage = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imagePic = await imageToBase64(file);
      setListingImage((prev) => [...prev, imagePic]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      if (listingImage.length < 1)
        return toast.error("must upload at least one image");

      if (listingImage.length > 6)
        return toast.error("images must not exceed the limit six");
      if (inputs.regularPrice < inputs.discountPrice)
        return toast.error("Discount price must be lower than regular price");
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/listing/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingData: {
            name: inputs.name,
            description: inputs.description,
            address: inputs.address,
            type: inputs.type,
            regularPrice: inputs.regularPrice,
            discountPrice: inputs.discountPrice ? inputs.discountPrice : "",
            bathroom: inputs.bathroom,
            bedroom: inputs.bedroom,
            offer: inputs.offer ? "true" : "false",
            parking: inputs.parking ? "true" : "false",
            furnished: inputs.furnished ? "true" : "false",
            images: listingImage,
            userRef: currentUser._id,
          },
        }),
      });
      setLoading(false);
      const fetchData = await res.json();
      if (fetchData.success) {
        e.target.reset();
        setListingImage([]);
        toast.success(fetchData.message);
        navigate(`/listing/${fetchData.data._id}`);
      }
      if (fetchData.error) {
        toast.error(fetchData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveImage = (index) => {
    setListingImage(listingImage.filter((_, i) => i !== index));
  };

  const handleOfferChange = () => {
    setOffer(!offer);
  };
  return (
    <div className="mt-20 max-w-6xl mx-auto flex flex-col  px-5 justify-center h-fit my-5">
      <h3 className="text-3xl font-medium text-gray-800 py-5 text-center">
        Create Listing
      </h3>
      <form className="w-full grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="focus:outline-none bg-white rounded-md py-2 px-3  w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="focus:outline-none bg-white rounded-md py-2 px-3  w-full resize-none"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="focus:outline-none bg-white rounded-md py-2 px-3  w-full"
            required
          />
          <div className="flex items-center gap-5">
            <div className="flex  items-center gap-3 -mt-4">
              <div className="flex items-center">
                <input
                  id="sell"
                  type="radio"
                  value="sell"
                  name="type"
                  className=" text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="sell"
                  className="ms-2 text-sm font-medium text-gray-600 "
                >
                  Sell
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="rent"
                  type="radio"
                  value="rent"
                  name="type"
                  className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="rent"
                  className="ms-2 text-sm font-medium text-gray-600"
                >
                  Rent
                </label>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="parking"
                type="checkbox"
                value="parking"
                name="parking"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="parking"
                className="ms-2 text-sm font-medium text-gray-600 "
              >
                Parking Spot
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="furnished"
                type="checkbox"
                value="furnished"
                name="furnished"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="furnished"
                className="ms-2 text-sm font-medium text-gray-600 "
              >
                Furnished
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                onChange={handleOfferChange}
                id="offer"
                type="checkbox"
                value="offer"
                name="offer"
                checked={offer}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="offer"
                className="ms-2 text-sm font-medium text-gray-600 "
              >
                Offer
              </label>
            </div>
          </div>
          <div className=" w-full flex items-center gap-5">
            <input
              min={50}
              max={100000000}
              type="number"
              name="regularPrice"
              placeholder="Regular Price"
              className="focus:outline-none bg-white rounded-md py-2 px-3  w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
            {offer && (
              <input
                min={50}
                max={100000000}
                type="number"
                name="discountPrice"
                placeholder="Discount Price"
                className="focus:outline-none bg-white rounded-md py-2 px-3  w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            )}
          </div>
          <div className=" w-full flex items-center gap-5">
            <input
              min={1}
              type="number"
              name="bedroom"
              placeholder="Bedroom Number"
              className="focus:outline-none bg-white rounded-md py-2 px-3  w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
            <input
              min={1}
              type="number"
              name="bathroom"
              placeholder="Bathroom Number"
              className="focus:outline-none bg-white rounded-md py-2 px-3  w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-gray-500 font-medium text-lg">
            <span className="text-gray-900">Images:</span>The first image will
            be the cover (max 6)
          </h6>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-400 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                onChange={handleListingImage}
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
              />
            </label>
          </div>
          {listingImage?.length > 0 &&
            listingImage?.map((image, index) => (
              <div
                key={index}
                className=" border border-gray-300 flex  items-center justify-between px-4 p-1 rounded-md"
              >
                <img
                  src={image}
                  alt="image"
                  className="w-20 h-20 object-contain "
                />
                <button
                  type="button"
                  className="text-megenta/80 text-lg hover:text-megenta"
                  onClick={() => handleRemoveImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            disabled={loading}
            className=" bg-blue rounded-md py-2 px-3 w-full text-white hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90"
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
