import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Oauth from "../components/Oauth";
import { useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import { baseUrl } from "../helper/baseUrl";
const Signup = () => {
  const navigate = useNavigate();
  const [openEye, setOpenEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registerInfo = Object.fromEntries(formData);
    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      setLoading(false);
      setError(null);
      const fetchData = await res.json();

      if (fetchData.success) {
        toast.success(fetchData.message);
        e.target.reset();
        navigate("/signin");
      }

      if (fetchData.error) {
        setError(fetchData.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <Breadcrumb title="Signup"/>
      <div className=" flex flex-col  px-5 justify-center h-fit py-10">
        <h3 className="text-3xl font-medium text-gray-800 py-5 text-center">
          Create Account
        </h3>
        <div className="w-full mx-auto flex justify-center mb-5">
          <img
            src="/EstateMart.png"
            alt="logo"
            className="w-[100px]  object-cover"
          />
        </div>
        <form
          className="w-full flex flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
          />
          <div className="relative sm:max-w-[40%] w-full">
            <input
              type={openEye ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="focus:outline-none bg-white rounded-md py-2 px-3 w-full"
            />
            {!openEye ? (
              <span className="absolute right-3 top-3 cursor-pointer">
                <RiEyeLine onClick={() => setOpenEye(true)} />
              </span>
            ) : (
              <span className="absolute right-3 top-3 cursor-pointer">
                <RiEyeCloseFill onClick={() => setOpenEye(false)} />
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className=" bg-blue rounded-md py-2 px-3 sm:max-w-[40%] w-full text-white hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90"
          >
            {loading ? <p>Loading...</p> : "Submit"}
          </button>
        </form>
        <div className="w-full mx-auto flex justify-center my-5">
          <Oauth />
        </div>

        {error && (
          <div className="sm:max-w-[40%] w-full mx-auto mt-5 bg-megenta/80 rounded-md py-2 px-3">
            <span className="  text-white   w-full">{error}</span>
          </div>
        )}

        <div className="sm:max-w-[40%] w-full mx-auto my-5">
          <p className="text-sm font-medium text-gray-600 ">
            Already have an account?
            <Link to="/signin">
              <span className="text-blue hover:underline pl-1 font-semibold">
                Signin
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
