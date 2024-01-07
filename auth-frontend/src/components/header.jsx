/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../slices/authSlice";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className=" w-full overflow-hidden border-b shadow-sm p-4">
      {
        <nav className="flex justify-between items-center">
          <div>
            <Link className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500  bg-clip-text" to="/">Derra</Link>
          </div>
          <ul className="flex gap-4">
            {!userInfo ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <div className="flex items-center gap-2 ">
                {
                  !userInfo.avatar ?
                    (<div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-500 ring-1">
                      <span className="text-xl  text-white"> R</span>
                    </div>) :
                    (
                      <div className="w-10 h-10 rounded-full">

                        <img className="w-full h-auto" width="50px" height="50px" 
                          src={userInfo.avatar}
                          alt="avatar"
                        />
                      </div>)
                }
                <li
                  onClick={() => dispatch(signOutUserSuccess())}
                  className="bg-blue-600 px-3 py-2 rounded-md text-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </div>
            )}
          </ul>
        </nav>
      }
    </header>
  );
}
