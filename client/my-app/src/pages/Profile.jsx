import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFailure,
} from "../redux/user/Userslice";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const Profile = () => {
  
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/user/update/${currentUser.user._id}`,
        formData,
        {
          headers: { Authorization: `${currentUser.token}` },
        }
      );

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(error);
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success(data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(updateUserFailure(error.response.data.message));
        toast.error(error.response.data.message);
      } else {
        dispatch(updateUserFailure(error.message));
        toast.error(error.message);
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex mt-10 items-center flex-col w-96">
              <div className="p-2">
                <p className="font-bold text-2xl">Profile</p>
              </div>

              <div className="p-2 mb-6">
                <img
                  src={currentUser.user.avatar}
                  alt="profileImage"
                  className="rounded-full h-24"
                />
              </div>

              <div className="flex flex-col w-64 md:w-full ">
                <input
                  type="text"
                  defaultValue={currentUser.user.name}
                  name="name"
                  id="name"
                  required
                  className="border border-1 border-black rounded mt-6 p-2 outline-none"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  defaultValue={currentUser.user.email}
                  name="email"
                  id="email"
                  required
                  className="border border-1 border-black rounded mt-6 p-2 outline-none"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="border border-1 border-black rounded mt-6 p-2 outline-none"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 w-64 md:w-full text-center bg-gray-500 text-white font-bold rounded mt-6 hover:opacity-70">
                <button className="p-2" type="submit">
                  UPDATE
                </button>
              </div>

              <div className="mt-4 text-red-600 font-bold w-full flex justify-between">
                <button className="pointer hover:opacity-50">
                  Delete Account
                </button>
                <button className="pointer hover:opacity-50">Sign out</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
