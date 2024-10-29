import { Link } from "react-router-dom";
import { CiInstagram, CiTwitter } from "react-icons/ci";
import { RiFacebookLine } from "react-icons/ri";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-white shadow-2xl h-[200px] flex flex-col justify-center items-center">
      <Link to="/">
        <img src="/EstateMart.png" alt="logo" className="w-[150px]" />
      </Link>
      <ul className="flex items-center gap-5 py-2">
        <li className="text-sm font-semibold text-gray-700">
          <Link to="/">Home</Link>
        </li>
        <li className="text-sm font-semibold text-gray-700">
          <Link to="/about">About</Link>
        </li>
        <li className="text-sm font-semibold text-gray-700">
          <Link to="#">Listing</Link>
        </li>
        <li className="text-sm font-semibold text-gray-700">
          <Link to="#">Blog</Link>
        </li>
        <li className="text-sm font-semibold text-gray-700">
          <Link to="#">Contact</Link>
        </li>
      </ul>
      <div className="flex items-center gap-5 p-1">
        <span className=" border border-megenta rounded-full text-megenta p-1ta">
          {" "}
          <Link to="https://www.facebook.com/" target="_blank">
            <RiFacebookLine size={28} />
          </Link>
        </span>
        <span className="border border-megenta rounded-full text-megenta p-1">
          <Link to="https://www.twitter.com/" target="_blank">
            <CiTwitter size={22} />
          </Link>
        </span>{" "}
        <span className="border border-megenta rounded-full text-megenta p-1">
          <Link to="https://www.instagram.com/" target="_blank">
            {" "}
            <CiInstagram size={22} />
          </Link>
        </span>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-blue/80">
          &copy; All Rights reserved | Estate Mart | Real Estate App -{year}{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
