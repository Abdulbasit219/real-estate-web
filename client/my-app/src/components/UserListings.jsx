import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";

const UserListings = ({}) => {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  //get the user list
  const getListing = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/listing/getListing/${currentUser.user._id}`
      );
      setUserListings(data.userListings);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 p-4 border"
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        
              {/* header */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    RegularPrice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DiscountedPrice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View
                  </th>
                </tr>
              </thead>

              {userListings.length > 0 ? (
                userListings.map((listing, index) => (
                  <>
                    {/* table body */}
                    <tbody>
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        {/* sr no */}
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>

                        {/* image */}
                        <td className="px-6 py-4">
                          <div className="flex gap-x-8 items-center">
                            <img
                              src={listing.images[0]}
                              alt="image"
                              className="h-[50px] w-[70px] rounded"
                            />
                          </div>
                        </td>

                        {/* name */}
                        <td className="px-6 py-4">
                          {listing.name.substring(0, 30)}...
                        </td>

                        {/* regularPrices  */}
                        <td className="px-6 py-4">${listing.regularPrices}</td>

                        {/* discountedPrice */}
                        <td className="px-6 py-4">
                          ${listing.discountedPrice}
                        </td>

                        {/* Action delete or edit */}
                        <td className="px-6 py-4">
                          <button
                            className="text-yellow-500 text-2xl hover:opacity-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 text-2xl hover:opacity-50"
                            title="Delete"
                          >
                            <MdDelete />
                          </button>
                        </td>

                        <td className="px-6 py-4 text-blue-500 hover:underline hover:text-blue-700 ">
                          <Link to={`/listing/${listing._id}`}>Click here</Link>
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))
              ) : (
                <p className="text-center mt-6">No Listings Found</p>
              )}
            </table>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserListings;
