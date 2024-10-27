import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
const ListingItem = ({ listing }) => {

  return (
    <Link to={`/listing/${listing?._id}`}>
      <div className="sm:max-w-[200px] max-w-[300px] w-full h-[300px] shadow hover:shadow-lg bg-white rounded-md flex flex-col transition-shadow">
        <div className="w-full rounded-t-md h-[230px] overflow-hidden  ">
          <img
            src={listing?.images[0].url}
            alt="/"
            className="w-full rounded-t-md h-full  hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="p-3  flex-col flex justify-between  gap-1 h-full">
          <h5 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {listing?.name}
          </h5>
          <div className="flex items-center gap-1 text-green-700">
            <span>
              <IoLocationSharp size={15} />
            </span>
            <span className="text-sm font-medium line-clamp-1 text-gray-600">
              {listing?.address}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-800 whitespace-normal line-clamp-2">
            {listing?.description}
          </p>
          <span className="text-xl font-semibold text-gray-800">
            ${listing?.offer ? listing?.discountPrice : listing?.regularPrice}
            {listing?.type === "rent" ? "/month" : ""}
          </span>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span>
              {listing?.bedroom} {listing?.bedroom > 1 ? "Beds" : "Bed"}
            </span>
            <span>
              {listing?.bathroom} {listing?.bathroom > 1 ? "Baths" : "Bath"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingItem;
