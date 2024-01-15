/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { CiUser } from "react-icons/ci";
import { useLoginMutation, useSignupMutation } from "../slices/userQuery";
import Oauth from "../components/Oauth";
import { app } from "../../firebase";
import { useToast } from "../../toastContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function SingnUp() {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(undefined);
  const [uploadStatus, setUploadStatus] = useState("");
  const { showToast } = useToast();
  const [signup] = useSignupMutation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  const uniqueIdentifier = useId();

  function getEmptyKeys(obj) {
    const emptyKeys = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key]) {
        emptyKeys.push(key);
      }
    }

    return emptyKeys;
  }
  console.log(user);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    if (name && email && password) {
      const res = await signup(user);
      if (res.data) {
        showToast(res.data.message, { type: "success" });
        navigate("/login");
      }
      console.log(res);
      showToast(res.error.data.message, { type: "error" });
    } else {
      const emptyKeys = getEmptyKeys(user);
      const text = `${emptyKeys} are empty`;
      showToast(text, { type: "error" });
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage();
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type,
    };
    const customeName = uniqueIdentifier + file.name;
    console.log(customeName);
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + customeName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(progress);
        console.log("Upload is " + progress + "% done");
        setFilePercentage(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            setUploadStatus("paused");

            break;
          case "running":
            // console.log("Upload is running");
            setUploadStatus("running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            setFileUploadError(
              " User doesn't have permission to access the object"
            );
            break;
          case "storage/canceled":
            setFileUploadError(" User canceled the upload");
            break;

          // ...

          case "storage/unknown":
            setFileUploadError(
              "Unknown error occurred, inspect error.serverResponse "
            );
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUser({ ...user, avatar: downloadURL });
          setUploadStatus("completed");
        });
      }
    );
  };

  useEffect(() => {
    showToast(
      fileUploadError || (uploadStatus === "completed" && "upload compled")
    );
  }, [fileUploadError, uploadStatus]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className=" w-full  max-w-xl space-y-8   ">
        <h2 className="text-4xl font-bold text-center text-gray-500  ">
          Create New Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="ring-1 ring-slate-200 space-y-8 px-8 py-14 border appearance-none  rounded "
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 border appearance-none"
              type="text"
              id="name"
              name="name"
              onChange={handlechange}
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border appearance-none"
              type="email"
              id="email"
              name="email"
              onChange={handlechange}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password </label>
            <input
              className="p-2 border appearance-none"
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              {user.avatar ? (
                <img
                  className=" w-12 h-12 object-cover rounded-full object-center 
                   onClick={() => fileRef.current.click()}
                  overflow-hidden border cursor-pointer ring-1 "
                  src={user.avatar}
                  alt="dsa"
                />
              ) : (
                <CiUser
                  size={48}
                  onClick={() => fileRef.current.click()}
                  className="ring-1 rounded-full p-2 ring-gray-800"
                />
              )}
            </div>
            <span className="font-semibold">
              {image ? image.name : "Select an image"}
            </span>

            <input
              ref={fileRef}
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              type="file"
              accept="image/*"
              name="profilePic"
            />
          </div>
          <div className="space-y-4">
            <button
              type="Submit"
              onClick={handleSubmit}
              className="bg-green-400 text-green-50 text-xl w-full p-3 rounded-md"
            >
              SingnUp
            </button>
            <Oauth />
          </div>
        </form>
      </div>
    </div>
  );
}
