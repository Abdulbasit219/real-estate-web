import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadingStart, loadingStop } from "../redux/user/Userslice";
import Loading from "../components/Loading";

const CreateListing = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrices: 50,
    discountedPrice: 0,
    baths: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "",
    offer: false,
    images: [],
  });
  const { loading, error, currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for image handler
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: selectedImages,
    });

    // Create image preview
    const imagePreviews = selectedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(imagePreviews);
  };

  // remove image function
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });

    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.offer === true && formData.discountedPrice === 0) {
      return toast.error("Please enter a discount price");
    } else if (!formData.name || !formData.description || !formData.address) {
      return toast.error("Required All fields");
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    }

    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      dispatch(loadingStart());
      const response = await axios.post(
        "http://localhost:8080/api/v1/listing/create",
        formDataToSend,
        {
          headers: {
            Authorization: `${currentUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log(response);
      dispatch(loadingStop());
      navigate(`/listing/${response.data.listing._id}`);
      toast.success(response.data.message);
    } catch (error) {
      dispatch(loadingStop());
      console.error("Error uploading data:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // handle onchange
  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-5 md:p-8">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Create a Listing
              </h2>

              {/* name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Listing Name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              {/* description */}
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* address */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  onChange={handleChange}
                  value={formData.address}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Listing Name"
                />
              </div>

              {/* numbers of beds etc */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bedrooms"
                  >
                    Beds
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.bedrooms}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bedrooms"
                    type="number"
                    placeholder="Number of Beds"
                  />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="baths"
                  >
                    Baths
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.baths}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="baths"
                    type="number"
                    placeholder="Number of Baths"
                  />
                </div>

                {/* regularPrices */}
                <div className="w-full md:w-1/3 px-3 mb-4 mt-2 md:mb-0">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Regular Price
                    {formData.type === "rent" ? <span> ($ / month) </span> : ""}
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.regularPrices}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="regularPrices"
                    type="number"
                    placeholder="Number of Beds"
                  />
                </div>

                {formData.offer && (
                  <div className="w-full md:w-1/3 px-3 mb-6 mt-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="discountedPrice"
                    >
                      Discounted Price
                      {formData.type === "rent" ? $ / month : ""}
                    </label>
                    <input
                      onChange={handleChange}
                      value={formData.discountedPrice}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="discountedPrice"
                      type="number"
                      placeholder="Number of Beds"
                    />
                  </div>
                )}
              </div>

              {/* Radio buttons for rent/sell */}
              <div className="flex gap-x-6 mb-6">
                <label className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="rent"
                    name="type"
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  Rent
                </label>

                <label className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="sell"
                    name="type"
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  Sale
                </label>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-x-6 md:gap-x-12 mb-6">
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="cursor-pointer"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  Parking Spot
                </label>

                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="cursor-pointer"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  Furnished
                </label>

                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="cursor-pointer"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  Offer
                </label>
              </div>

              {/* image input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="images"
                >
                  Images
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              {/* image preview */}
              <div>
                <div className="image-preview-container">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center px-8 pb-2 mb-2 ${
                        index !== imagePreviews.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      }`}
                    >
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-[80px] w-[80px] rounded m-4"
                      />
                      <button
                        className="text-red-500 font-bold text-xl hover:opacity-50"
                        onClick={() => handleRemoveImage(index)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* crete listing btns */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateListing;
