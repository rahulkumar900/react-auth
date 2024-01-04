/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="p-4 border-b">
      <nav className="flex justify-between">
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
              onClick={() => dispatch(logout())}
              className="bg-blue-600 px-3 py-2 rounded-md text-gray-100 cursor-pointer"
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
