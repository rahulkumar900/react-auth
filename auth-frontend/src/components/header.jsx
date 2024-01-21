/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../slices/authSlice";
import HeaderProfile from "./atoms/profile-pic";
import { useEffect, useReducer, useRef, useState } from "react";
import DropProfile from "./atoms/dropProfile";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo?.avatar);
  const dispatch = useDispatch();

  const [isOff, setIsoff] = useState(true);
  const dropProfileRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if the click is outside it
      if (dropProfileRef.current && !dropProfileRef.current.contains(event.target)) {
        setIsoff(true);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className=" w-full  border-b shadow-sm p-4">

      <nav className="flex justify-between items-center max-w-5xl relative mx-auto">
        <div>
          <Link
            className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500  bg-clip-text"
            to="/"
          >
            Derra
          </Link>
        </div>
        <ul className="" ref={dropProfileRef}>
          {!userInfo ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <div  className="flex items-center gap-2 relative ">
              {userInfo && (
                <HeaderProfile
                  avatar={userInfo.avatar}
                  onClick={() => setIsoff(!isOff)}
                  className="w-10 h-10 cursor-pointer object-cover rounded-full text-lg font-bold"
                />
              )}
              {userInfo && <DropProfile isOff={isOff} userInfo={userInfo} />}

            </div>
          )}
        </ul>



      </nav>

    </header>
  );
}
