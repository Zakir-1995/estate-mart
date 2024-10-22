import { useEffect, useState } from "react";
import { baseUrl } from "../helper/baseUrl";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
const Contact = ({ listingData }) => {
  const [landlord, setLandlord] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/user/user/${listingData?.userRef}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const fetchData = await res.json();
        if (fetchData?.success) {
          setLandlord(fetchData?.data);
        }
        if (fetchData?.error) {
          toast.error(fetchData?.error);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [listingData?.userRef]);
  return (
    <div>
      {landlord && (
        <div className="py-4">
          <p className="text-lg font-medium text-gray-800">
            Contact with{" "}
            <span className="text-gray-900 font-semibold">
              {landlord?.username}
            </span>{" "}
            for <span>{listingData?.name}</span>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Enter message here..."
            className="w-full bg-transparent rounded border border-gray-400 px-2 py-1 my-2"
          />
          <div className="w-full flex justify-center">
            <Link
              to={`mailto:${landlord?.email}?subject=regarding ${listingData?.name}&body=${message}`}
              className="bg-gray-600/90 transition-all duration-150 ease-in-out text-white px-2 py-2 rounded-full w-full uppercase hover:bg-gray-600 text-center"
            >
              Send Message
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
