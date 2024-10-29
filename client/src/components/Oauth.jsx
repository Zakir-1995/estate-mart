import { FaGoogle } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/userSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../helper/baseUrl.js";
const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const response = await fetch(`${baseUrl}/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
        }),
      });
      const data = await response.json();
      console.log(data.data);
      if (data.success) {
        dispatch(signinSuccess(data.data));
        toast.success(data.message);
        navigate("/");
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Could not signin with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className="rounded-md py-2 px-3 sm:max-w-[40%] w-full  bg-megenta text-white  hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90 flex items-center justify-center gap-2"
    >
      <FaGoogle /> <span> Continue With Google</span>
    </button>
  );
};

export default Oauth;
