import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/Userslice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch(); 
  const nanvigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      dispatch(signInSuccess(data));
      nanvigate('/');

    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogle}
        type="button"
        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
