import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
const Header = () => {
    const [isSticky, setSticky] = useState(false);
    const [menuOpen,setMenuOpen] = useState(false)
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
        <ul className="hidden items-center justify-center gap-4 md:flex">
          <Link to="/">
            <li className="uppercase text-lg  text-gray-600">Home</li>
          </Link>
          <Link to="/about">
            <li className="uppercase text-lg  text-gray-600">About</li>
          </Link>
          <Link to="/signin">
            <li className="uppercase text-lg  text-gray-600">Signin</li>
          </Link>
        </ul>

        <div
          className={`absolute md:hidden block transition-all duration-700 ease-in-out -z-10 top-14 space-y-8 w-full bg-black/60 p-4 ${
            menuOpen ? " opacity-100 visible" : " opacity-0 invisible"
          }`}
        >
          <ul className="md:hidden flex flex-col gap-8  w-full">
            <Link to="/" className="w-full ">
              <li className="uppercase text-lg text-white ">Home</li>
            </Link>
            <Link to="/about" className="w-full ">
              <li className="uppercase text-lg text-white">About</li>
            </Link>
            <Link to="/signin" className="w-full ">
              <li className="uppercase text-lg text-white">Signin</li>
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

      <div className="absolute right-5 top-5 md:hidden block">
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
