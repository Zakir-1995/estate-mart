import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../helper/baseUrl";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";
import { MdLocationOn } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaBath, FaParking, FaChair } from "react-icons/fa";

const Listing = () => {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const swiperRef = useRef();
console.log(listingData);
  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${baseUrl}/listing/get-listing/${id}`);
        const fetchRes = await res.json();
        if (fetchRes?.success) {
          setLoading(false);
          setError(false);
          setListingData(fetchRes?.data);
        }
        if (fetchRes?.error) {
          setLoading(false);
          setError("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getListing();
  }, [id]);
  return (
    <div className="mt-20  flex flex-col  justify-center h-fit py-5">
      {loading && (
        <p className="flex justify-center w-full text-xl font-semibold ">
          Loading...
        </p>
      )}
      {error && (
        <p className="flex justify-center w-full text-xl font-semibold ">
          {error}
        </p>
      )}

      {listingData && !loading && !error && (
        <div>
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={2000}
              className="mySwiper"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {listingData.images.map((image, index) => (
                <SwiperSlide key={index} className="h-[500px] ">
                  <div
                    className="h-full w-full"
                    style={{
                      background: `url(${image?.url}) no-repeat center `,
                      objectFit: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="absolute top-[50%] z-50 -translate-y-[50%] left-10 opacity-70 hover:opacity-100 transition ease-linear duration-150"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <CgChevronLeftO size={25} />
            </button>
            <button
              className="absolute top-[50%] z-50 -translate-y-[50%] right-10 opacity-70 hover:opacity-100 transition ease-linear duration-150"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <CgChevronRightO size={25} />
            </button>
          </div>
          <div className="max-w-5xl mx-auto py-5 px-3 sm:px-5">
            <h3 className="md:text-3xl lg:text-4xl text-2xl font-semibold text-gray-900">
              {listingData?.name} - $
              {listingData?.offer
                ? listingData?.discountPrice
                : listingData?.regularPrice}
            </h3>
            <div className="flex items-center gap-1 mt-5 ">
              <span className="text-green-700 text-lg ">
                <MdLocationOn />
              </span>
              <span className="text-sm font-medium text-gray-900">
                {listingData?.address}
              </span>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <span className="sm:text-xl text-lg font-medium bg-megenta w-[100px] flex justify-center text-white  rounded py-[2px]">
                {listingData?.type === "rent" ? " For Rent" : "For Sell"}
              </span>
              {listingData?.offer && (
                <span className="text-xl font-medium bg-green-700 w-[100px] flex justify-center text-white  rounded py-[2px]">
                  $
                  {`${
                    listingData?.discountPrice
                      ? listingData?.regularPrice - listingData?.discountPrice
                      : null
                  } `}{" "}
                  Discount
                </span>
              )}
            </div>
            <p className="mt-5 text-sm font-medium text-gray-700">
              {listingData?.description}
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <div className="flex items-center gap-1 text-sm font-medium text-green-700">
                <span className="">
                  <IoBed />
                </span>
                <span>
                  {listingData?.bedroom}{" "}
                  {listingData?.bedroom > 1 ? "Beds" : "Bed"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <span className="">
                  <FaBath />
                </span>
                <span>
                  {listingData?.bathroom}{" "}
                  {listingData?.bathroom > 1 ? "Baths" : "Bath"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <span className="">
                  <FaParking />
                </span>
                <span>
                  {listingData?.parking ? "Parking Available" : "No Parking"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <span className="">
                  <FaChair />
                </span>
                <span>
                  {listingData?.furnished ? "Furnished" : "Not Furnished"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
