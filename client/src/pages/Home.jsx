import { useEffect, useRef, useState } from "react";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { baseUrl } from "../helper/baseUrl";
import ListingItem from "../components/ListingItem";
const Home = () => {
  const swiperRef = useRef();
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log(offerListings, sellListings, rentListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${baseUrl}/listing/search?offer=true&limit=5`);
        const data = await res.json();
        if (data) {
          setOfferListings(data);
          fetchRentListings();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${baseUrl}/listing/search?type=rent&limit=5`);
        const data = await res.json();
        if (data) {
          setRentListings(data);
          fetchSellListings();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSellListings = async () => {
      try {
        const res = await fetch(`${baseUrl}/listing/search?type=sell&limit=5`);
        const data = await res.json();
        if (data) {
          setSellListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <>
      <div className="mt-20  max-w-6xl mx-auto xl:px-0 px-3 ">
        <div className="w-full flex flex-col gap-4 py-6">
          <h1 className=" lg:text-6xl text-3xl font-semibold text-gray-800">
            Find your next <span className="text-megenta">perfect</span> <br />{" "}
            place with ease
          </h1>
          <p className="py-3 lg:text-sm text-xs  font-medium text-gray-600 leading-6">
            Estate mart will help you find your home fast, easy and comfortable.{" "}
            <br /> We have a wide range of properties for you to choose them.{" "}
          </p>
          <Link
            to="/search"
            className="text-blue font-bold lg:text-lg text-base hover:underline w-fit"
          >
            Let{"'"}s Get Started...{" "}
          </Link>
        </div>
      </div>
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={2000}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((image, index) => (
              <SwiperSlide key={index} className="h-[450px] w-full ">
                <div
                  className="h-full w-full "
                  style={{
                    backgroundImage: `url(${image?.images[0].url}) `,
                    backgroundSize: "100vw 130vh",
                    backgroundPosition: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
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
      <div className="max-w-6xl mx-auto xl:px-0 px-3 py-6">
        <h5 className="text-xl font-semibold text-gray-800 pb-1">
          Recent Offer
        </h5>
        <hr className=" border-gray-400 pb-1" />
        <Link
          to="/search?offer=true"
          className="hover:underline text-sm font-semibold text-blue"
        >
          View More Offers...
        </Link>
        <div className="  grid grid-cols-5 gap-5 place-items-center py-5">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        <h5 className="text-xl font-semibold text-gray-800 pb-1">
          Apartment For Rent
        </h5>
        <hr className=" border-gray-400 pb-1" />
        <Link
          to="/search?type=rent"
          className="hover:underline text-sm font-semibold text-blue"
        >
          View More Appartment...
        </Link>
        <div className="  grid grid-cols-5 gap-5 place-items-center py-5">
          {rentListings &&
            rentListings.length > 0 &&
            rentListings.map((rent) => (
              <ListingItem key={rent._id} listing={rent} />
            ))}
        </div>
        <h5 className="text-xl font-semibold text-gray-800 pb-1">
          Apartment For Sell
        </h5>
        <hr className=" border-gray-400 pb-1" />
        <Link
          to="/search?type=sell"
          className="hover:underline text-sm font-semibold text-blue"
        >
          View More Appartment...
        </Link>
        <div className="  grid grid-cols-5 gap-5 place-items-center py-5">
          {sellListings &&
            sellListings.length > 0 &&
            sellListings.map((sell) => (
              <ListingItem key={sell._id} listing={sell} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
