import { useEffect, useRef, useState } from "react";
import { RiEyeCloseFill, RiEyeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
// firbase storage

// allow read;
// allow write:if
// request.resource.size < 2 * 1024 *1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const fileRef = useRef(null);
  const [openEye, setOpenEye] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(filePerc);
  console.log(formData);

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
            setFormData({ ...formData, avatar: downloadURL });
          });
        }
      );
    };
    if (file) {
      handleFileUpload(file);
    }
    /* eslint-disable */
  }, [file]);

  return (
    <div className="mt-20 max-w-6xl mx-auto flex flex-col  px-5 justify-center h-fit py-5">
      <h3 className="text-3xl font-medium text-gray-800 py-5 text-center">
        Profile
      </h3>

      <form
        className="w-full flex flex-col items-center gap-5"
        // onSubmit={handleSubmit}
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
            src={formData.avatar || currentUser?.avatar}
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
          {loading ? <p>Loading...</p> : "Update"}
        </button>
      </form>

      <div className="sm:max-w-[40%] w-full mx-auto mt-5 flex items-center justify-between gap-5 px-5">
        <button className=" font-medium text-megenta">Delete Account?</button>
        <button className=" font-medium text-megenta">Sign Out</button>
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
