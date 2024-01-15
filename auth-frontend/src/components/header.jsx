/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../slices/authSlice";
import HeaderProfile from "./atoms/profile-pic";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo?.avatar);
  const dispatch = useDispatch();
  return (
    <header className=" w-full overflow-hidden border-b shadow-sm p-4">
      {
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <div>
            <Link
              className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500  bg-clip-text"
              to="/"
            >
              Derra
            </Link>
          </div>
          <ul className="flex gap-4">
            {!userInfo ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <div className="flex items-center gap-2 ">
                {userInfo && (
                  <HeaderProfile
                    avatar={userInfo.avatar}
                    className="w-10 h-10 object-cover rounded-full text-lg font-bold"
                  />
                )}
                <button
                  onClick={() => dispatch(signOutUserSuccess())}
                  className="bg-blue-600 px-3 py-2 rounded-md text-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </nav>
      }
    </header>
  );
}
