/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userSlice";
export default function login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(user);
      if (res.data) {
        dispatch(setCredentials(res.data.user));
        navigate("/home");
      } else {
        navigate("/login");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mt-48 justify-center items-center ">
      <div className="  w-full  md:max-w-3xl space-y-8  ">
        <h2 className="text-4xl font-bold text-center ">Login</h2>
        <div className="space-y-4 p-8 border shadow-md rounded ">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border"
              type="email"
              id="email"
              name="email"
              onChange={handlechange}
              placeholder="Email"
              autoComplete="true"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password </label>
            <input
              className="p-2 border"
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              placeholder="Password"
              autoComplete="true"
            />
          </div>

          <button
            type="Submit"
            onClick={handleSubmit}
            className="bg-green-600 text-white text-xl w-full p-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
