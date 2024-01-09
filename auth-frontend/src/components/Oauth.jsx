import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useGoogleMutation } from "../slices/userQuery";
import { signInStart, setCredentials } from "../slices/authSlice";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const [google] = useGoogleMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const { user } = await signInWithPopup(auth, provider);
      const authUser = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const res = await google(authUser);
      console.log("user login data", res);
      dispatch(setCredentials(res.data.rest));
      navigate("/");
    } catch (error) {
      navigate("/login");
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
