import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/Userslice";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { handleLogout } from "../utils/utilsFunc";
import { Link, useNavigate } from "react-router-dom";
import UserListings from "../components/userListings";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [showListings, setShowListings] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //update user
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

  // delete user
  const handleDeleteUser = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/user/delete/${currentUser.user._id}`,
        {
          headers: { Authorization: `${currentUser.token}` },
        }
      );
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleUserListing = () => {
    setShowListings(!showListings)
    navigate('/userListings');
  }

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center mb-10">
          <form onSubmit={handleSubmit}>
            <div className="flex mt-4 items-center flex-col w-96">
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

              {/* update btn */}
              <div className="mt-4 w-64 md:w-full text-center bg-gray-500 text-white font-bold rounded mt-6 hover:opacity-70">
                <button className="p-2" type="submit">
                  UPDATE
                </button>
              </div>

              {/* create listing btn */}
              <div className="w-64 md:w-full text-center bg-green-600 text-white font-bold rounded mt-2 hover:opacity-70">
                <button className="p-2" type="button">
                  <Link to={"/create-Listing"}>Create Listing</Link>
                </button>
              </div>

              {/* delete & sign out */}
              <div className="mt-4 text-red-600 font-bold w-full flex justify-between">
                <button
                  type="button"
                  className="pointer hover:opacity-50"
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  onClick={() => handleLogout(dispatch)}
                  className="pointer hover:opacity-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </form>

          {/* show & hide listing button */}
          <div className="mt-4">
            <button
              className="hover:opacity-50 text-green-600 text-2xl hover:underline"
              onClick={handleUserListing}
            >
              View Listing
            </button>
          </div>

          {/* show all listings by user */}
          <div className="w-96">
            {/* {showListings && <UserListings id={currentUser.user._id} />} */}

          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
