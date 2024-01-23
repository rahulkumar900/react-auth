/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userQuery";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
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
        navigate("/");
      } else {
        navigate("/login");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full p-4 justify-center items-center ">
      <div className="  w-full  max-w-xl space-y-8  ">
        <h2 className="text-4xl font-bold text-center ">Login</h2>
        <div className="space-y-8 px-8 py-14 border bg-zinc-100  rounded-md ring-1 ring-zinc-300  drop-shadow-sm ">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="p-3 border"
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
              className="p-3 border"
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              placeholder="Password"
              autoComplete="true"
            />
          </div>
          <div className="space-y-4">
            <button
              type="Submit"
              onClick={handleSubmit}
              className="bg-green-800 text-green-50 text-xl w-full p-3 rounded-md"
            >
              Login
            </button>
            <Link
              to={"/signup"}
              className="flex justify-center  bg-indigo-800 text-green-50 text-xl w-full p-3 rounded-md"
            >
              Create new Account
            </Link>
            <Oauth />
          </div>
        </div>
      </div>
    </div>
  );
}
