/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../slices/authSlice";
import HeaderProfile from "./atoms/profile-pic";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo?.avatar);
  const dispatch = useDispatch();
  return (
    <header className=" w-full  border-b shadow-sm p-4">
      {
        <nav className="flex justify-between items-center max-w-5xl relative mx-auto">
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
              <div className="flex items-center gap-2 relative">
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

          <div className=" bg-gray-200 space-y-6 border p-4 rounded-lg shadow-md ring-1 ring-gray-300 absolute z-40 top-12 right-0">
            <img
              className="rounded-full w-20 h-20 mx-auto"
              src={userInfo.avatar}
              alt={userInfo.name}
              width={200}
              height={200}
            />
            <div className="text-center uppercase font-semibold leading-3">
              {userInfo.name}
            </div>
            <div className="space-x-4 flex">
              <Link className=" flex gap-1 items-center text-gray-600 font-medium ring-1 ring-gray-300   bg-gray-50 px-6 py-2 border rounded-lg">
                <FaPlus className="" fill="currentColor" size={22} />

                <div> Create Listing</div>
              </Link>
              <div
                role="button"
                className=" text-gray-600 font-medium ring-1 ring-gray-300  bg-gray-50 px-6 py-2 border rounded-lg"
              >
                Logout
              </div>
            </div>
          </div>
        </nav>
      }
    </header>
  );
}
