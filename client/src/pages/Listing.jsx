import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../helper/baseUrl";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";

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
                  className="h-full "
                  style={{
                    background: `url(${image?.url}) no-repeat center `,
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
      )}
    </div>
  );
};

export default Listing;
