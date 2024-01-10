/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { CiUser } from "react-icons/ci";
import { useLoginMutation } from "../slices/userQuery";

import Oauth from "../components/Oauth";
export default function SingnUp() {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  const [login] = useLoginMutation();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await login(user);
    //   if (res.data) {
    //     dispatch(setCredentials(res.data.user));
    //     navigate("/");
    //   } else {
    //     navigate("/login");
    //   }

    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleFile = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  return (
    <div className="flex mt-48 justify-center items-center ">
      <div className="  w-full  max-w-xl space-y-8  ">
        <h2 className="text-4xl font-bold text-center ">Create New Account</h2>
        <form className="space-y-8 px-8 py-14 border appearance-none  rounded ">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 border appearance-none"
              type="text"
              id="name"
              name="name"
              onChange={handlechange}
              placeholder="Name"
              autoComplete
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
              autoComplete
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
              autoComplete="true"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileRef.current.click()}
              className=" border cursor-pointer w-12 h-12 items-center justify-center flex  rounded-full p-2 ring-1 ring-gray-400"
            >
              <CiUser size={30} />
            </div>
            <span className="font-semibold">Select Profile Pic</span>

            <input
              ref={fileRef}
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