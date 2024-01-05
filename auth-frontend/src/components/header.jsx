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
            <Link to="/">Home</Link>
          </div>
          <ul className="flex gap-4">
            {!userInfo ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li
                onClick={() => dispatch(signOutUserSuccess())}
                className="bg-blue-600 px-3 py-2 rounded-md text-gray-100 cursor-pointer"
              >
                Logout
              </li>
            )}
          </ul>
        </nav>
      }
    </header>
  );
}
