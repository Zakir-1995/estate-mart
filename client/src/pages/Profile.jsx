import { useEffect, useRef, useState } from "react";
import { RiEyeCloseFill, RiEyeLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-hot-toast";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  signoutStart,
  signoutSuccess,
  signoutFailure
} from "../redux/userSlice";
import {Link} from 'react-router-dom'

// firbase storage
// allow read;
// allow write:if
// request.resource.size < 2 * 1024 *1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [openEye, setOpenEye] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [imageData, setImageData] = useState({});
  const [formData, setFormData] = useState({
    username:currentUser.username,
    email: currentUser.email,
    password: "",
   
  });
  const { username, email, password } = formData
  
  const handleChange = (e) => {
    const {name,value} =e.target
    setFormData({...formData,[name]:value});
  };

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `avatar/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        (error) => {
          setUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageData({ ...imageData, avatar: downloadURL });
          });
        }
      );
    };
    if (file) {
      handleFileUpload(file);
    }
    /* eslint-disable */
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:8080/api/user/update-user/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
            avatar: imageData.avatar,
          }),
        }
      );
      const fetchData = await res.json();
      if (fetchData.success) {
        e.target.reset();
        dispatch(updateUserSuccess(fetchData.data));
        toast.success(fetchData.message);
      }

      if (fetchData.error) {
        dispatch(updateUserFailure(fetchData.message));
        toast.error(fetchData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser =async () => {
    try {
      alert("are you sure?")
   dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:8080/api/user/delete-user/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        })
      const fetchData = await res.json()
      if (fetchData.success) {
        dispatch(deleteUserSuccess())
        toast.success(fetchData.message)
      }
          if (fetchData.error) {
            dispatch(deleteUserFailure(fetchData.message));
            toast.error(fetchData.message);
          }
    } catch (error) {
      console.log(error)
    }
  }

    const handleSignout = async () => {
      try {
        dispatch(signoutStart())
        const res = await fetch(`http://localhost:8080/api/user/signout`, {
          method: "POST",
          credentials: "include",
        });
        const fetchData = await res.json();
        if (fetchData.success) {
          dispatch(signoutSuccess());
          toast.success(fetchData.message);
        }
        if (fetchData.error) {
          dispatch(signoutFailure(fetchData.message));
          toast.error(fetchData.message);
        }
      } catch (error) {
        console.log(error);
      }
    };



  return (
    <div className="mt-20 max-w-6xl mx-auto flex flex-col  px-5 justify-center h-fit py-5">
      <h3 className="text-3xl font-medium text-gray-800 py-5 text-center">
        Profile
      </h3>

      <form
        className="w-full flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <div className="w-full mx-auto flex justify-center">
          <img
            src={imageData.avatar || currentUser?.avatar}
            alt={`${currentUser?.username}`}
            className="w-20 h-20 rounded-full  object-cover"
            onClick={() => fileRef.current.click()}
          />
        </div>
        {uploadError ? (
          <span className="text-megenta">
            Error Image Upload (Image size less than 2mb){" "}
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span>Uploading {filePerc}%</span>
        ) : filePerc === 100 ? (
          <span>Image Successfully Uploaded!</span>
        ) : (
          ""
        )}

        <input
          type="text"
          defaultValue={username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
          className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
        />
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={handleChange}
          placeholder="Email"
          className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
        />
        <div className="relative sm:max-w-[40%] w-full">
          <input
            type={`${openEye ? "text" : "password"}`}
            name="password"
            onChange={handleChange}
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
          {loading ? <p>Loading...</p> : "Update"}
        </button>
      </form>
      <div className="sm:max-w-[40%] mx-auto  w-full mt-5">
        <Link to="/create-listing">
          <button className=" bg-green-700 rounded-md py-2 px-3  w-full text-white hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90">
            Create Listing
          </button>
        </Link>
      </div>
      <div className="sm:max-w-[40%] w-full mx-auto mt-5 flex items-center justify-between gap-5 px-5">
        <button
          onClick={handleDeleteUser}
          className=" font-medium text-megenta"
        >
          Delete Account?
        </button>
        <button onClick={handleSignout} className=" font-medium text-megenta">
          Sign Out
        </button>
      </div>

      {error && (
        <div className="sm:max-w-[40%] w-full mx-auto mt-5 bg-megenta/80 rounded-md py-2 px-3">
          <span className="  text-white   w-full">{error}</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
