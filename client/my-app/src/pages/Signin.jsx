import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFalure,
  signInSuccess,
} from "../redux/user/Userslice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData
      );
      if (data.success === false) {
        dispatch(signInFalure(data.message));
        toast.error(error);
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("Login Successfully");

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(signInFalure(error.response.data.message));
        toast.error(error.response.data.message); 
      } else {
        dispatch(signInFalure(error.message));
        toast.error(error.message); 
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline:none p-2"
                    placeholder="Enter email address"
                    onChange={onchange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline:none p-2"
                    placeholder="Enter Password"
                    onChange={onchange}
                    value={formData.password}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div>
                <OAuth />
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not have An account?
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Signin;
