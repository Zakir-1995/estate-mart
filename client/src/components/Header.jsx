import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import {useSelector} from "react-redux"
const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const location = useLocation();
  const [isSticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`  fixed top-0 left-0 right-0 xl:px-24 sm:px-4 px-2 z-50  p-3 border-b border-gray-300 ${
        isSticky
          ? "bg-white shadow-md transition-all duration-200 ease-in-out border-none"
          : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto relative">
        <Link to="/">
          <img src="/EstateMart.png" alt="/" className="w-36" />
        </Link>
        <form className="border border-gray-300 rounded p-2 md:flex items-center justify-between hidden ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 pr-4 placeholder:text-lg text-gray-600 text-lg placeholder:font-light"
          />
          <CiSearch size={22} className="text-gray-600" />
        </form>
        <div className="flex items-center gap-5">
          <ul className="hidden items-center justify-center gap-4 md:flex">
            <Link to="/">
              <li
                className={`uppercase text-lg   ${
                  location.pathname === "/"
                    ? "text-white bg-megenta px-3 rounded"
                    : "text-gray-600 bg-transparent px-3"
                }`}
              >
                Home
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`uppercase text-lg   ${
                  location.pathname === "/about"
                    ? "text-white bg-megenta px-3 rounded"
                    : "text-gray-600 bg-transparent px-3"
                }`}
              >
                About
              </li>
            </Link>
          </ul>
          <Link to={`${currentUser ? "/profile" : "/signin"}`}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <>
                {" "}
                <span
                  className={`uppercase text-lg ${
                    location.pathname === "/signin"
                      ? "text-white bg-megenta px-3 py-1 rounded"
                      : "text-gray-600 bg-transparent px-3 py-1"
                  }`}
                >
                  Signin
                </span>
              </>
            )}
          </Link>
        </div>

        {/* mobile menu  */}
        <div
          className={`absolute md:hidden block transition-all duration-700 ease-in-out -z-10 top-14 space-y-8 w-full bg-black/60 p-4 ${
            menuOpen ? " opacity-100 visible" : " opacity-0 invisible"
          }`}
        >
          <ul className="md:hidden flex flex-col gap-8  w-full">
            <Link to="/" className="w-full ">
              <li
                className={`uppercase text-lg  ${
                  location.pathname === "/"
                    ? "text-white bg-megenta px-4 py-1 rounded-md"
                    : "text-white px-4 py-1"
                }`}
              >
                Home
              </li>
            </Link>
            <Link to="/about" className="w-full ">
              <li
                className={`uppercase text-lg  ${
                  location.pathname === "/about"
                    ? "text-white bg-megenta px-4 py-1 rounded-md"
                    : "text-white px-4 py-1"
                }`}
              >
                About
              </li>
            </Link>
          </ul>
          <form className="border border-white rounded p-2 flex items-center justify-between md:hidden ">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full placeholder:text-white  pr-4 placeholder:text-lg text-white text-lg placeholder:font-light"
            />
            <CiSearch size={22} className="text-white" />
          </form>
        </div>
      </div>

      {/* mobile menu handler  */}
      <div className="absolute right-16 top-5 md:hidden block">
        {menuOpen ? (
          <button onClick={() => setMenuOpen(false)}>
            <IoCloseSharp size={22} />
          </button>
        ) : (
          <button onClick={() => setMenuOpen(true)}>
            <IoMenu size={22} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
