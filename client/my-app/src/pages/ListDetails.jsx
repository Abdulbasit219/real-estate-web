import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaBath, FaChair, FaLocationDot } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../redux/user/Userslice";
import Loading from "../components/Loading";

const ListDetails = () => {
  const [list, setList] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  // Fetch listing data from API
  const getListData = async () => {
    try {
      dispatch(loadingStart());
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/listing/getList/${id}`
      );
      setList(data.list);
      dispatch(loadingStop());
      console.log(data);
    } catch (error) {
      dispatch(loadingStop());
      console.error("Error uploading data:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Show next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === list?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Show previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? list?.images?.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-[80vh] p-2">
          <div className="relative w-full h-64 md:h-[85vh] p-2">
            {/* Display images */}
            {list?.images?.map(
              (image, index) =>
                activeIndex === index && (
                  <div
                    className="relative h-full overflow-hidden rounded-lg px-2 "
                    key={index}
                  >
                    <div className="duration-700 ease-in-out">
                      <img
                        src={image}
                        className="absolute block w-full h-full object-cover top-0 left-0"
                        alt={`slide-${index}`}
                      />
                    </div>
                  </div>
                )
            )}

            {/* Previous Slide Button */}
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 left-2 z-30 flex items-center justify-center rounded-full bg-white text-blue-500 h-10 w-10 md:h-20 md:w-20 shadow hover:opacity-70 focus:outline-none md:text-6xl"
              onClick={prevSlide}
            >
              <IoIosArrowBack />
            </button>

            {/* Next Slide Button */}
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-2 z-30 flex items-center justify-center rounded-full bg-white text-blue-500 w-10 h-10 md:h-20 md:w-20 shadow hover:opacity-70 focus:outline-none md:text-6xl"
              onClick={nextSlide}
            >
              <IoIosArrowForward />
            </button>
          </div>

          {/* list detail */}
          <div className="ml-4 md:ml-16 p-4">
            <h1 className="hidden md:block font-semibold text-4xl mt-4">
              Product Details
            </h1>
            {list && (
              <div className="my-6 md:mt-10 md:mb-10 md:w-[50%] ">
                {/* name & price heading  */}
                <h1 className="font-semibold text-4xl">
                  {list.name} - &#36; {list.regularPrices}
                </h1>

                {/* location */}
                <p className="mt-4 text-green-700 text-2xl flex items-center py-2 gap-x-2">
                  <FaLocationDot /> {list.address}
                </p>

                {/* for rent or sale  */}
                <div className="flex gap-x-2 md:w-[40%]">
                  <p className="bg-red-700 p-2 text-white w-[40%] md:w-[50%] text-center rounded md:text-xl">
                    {list.type === "sell" ? "For Sale" : "For Rent"}
                  </p>
                  {list.discountedPrice !== 0 ? (
                    <p className="bg-green-700 p-2 text-white w-[40%] md:w-[50%] text-center rounded md:text-xl">
                      {list.discountedPrice} discount
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* description */}
                <p className="my-2 text-xl break-words max-w-full">
                  <span className="font-semibold ">Description</span> -
                  {list.description}
                </p>

                <div className="flex flex-wrap font-semibold gap-x-2 mt-4 text-xl text-green-700">
                  <p className="flex items-center gap-x-2">
                    <IoBedSharp />
                    {list.bedrooms > 1
                      ? `${list.bedrooms} Beds`
                      : `${list.bedrooms} Bed`}
                  </p>

                  <p className="flex items-center gap-x-2">
                    <FaBath />
                    {list.baths > 1
                      ? `${list.baths} Beths`
                      : `${list.baths} Bath`}
                  </p>

                  <p className="flex items-center gap-x-2">
                    <FaParking />
                    {list.parking ? "Parking Spot" : "No Parking Spot"}
                  </p>

                  <p className="flex items-center gap-x-2">
                    <FaChair />
                    {list.furnished ? "Furnished" : "Unfurnished"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListDetails;
