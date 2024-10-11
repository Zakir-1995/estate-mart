import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto flex flex-col  px-5">
      <h3 className="text-3xl font-medium text-gray-800 py-5 text-center">
        Sign Up
      </h3>
      <form className="w-full flex flex-col items-center gap-5">
        <input
          type="text"
          placeholder="Username"
          className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[50%] w-full"
        />
        <input
          type="emai"
          placeholder="Email"
          className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[50%] w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[50%] w-full"
        />
        <button className=" bg-blue rounded-md py-2 px-3 sm:max-w-[50%] w-full text-white hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90">
          Submit
        </button>
      </form>
      <div className="sm:max-w-[50%] w-full mx-auto my-5">
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
  );
}

export default Signup