import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import ".css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showmenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav
        className={`w-full h-[80px] shadow-lg flex justify-around bg-gray-100 items-center z-99 fixed top-0 md:px-16`}
      >
        {/* logo section */}
        <div className="w-[70%] md:w-[20%] text-center font-bold text-gray-500 text-xl ml-4">
          <h1 className=""> &lt; Real Estate /&gt;</h1>
        </div>

        {/* list item and hamburger menu*/}
        <div className="w-[80%] flex flex-grow sm:justify-between px-10 z-99">
          {/* search box section */}
          <div
            className={`${
              showSearch
                ? "bg-white w-full flex justify-center absolute top-20 left-0 shadow-lg p-2"
                : "hidden"
            } sm:flex px-4`}
          >
            <input
              type="text"
              placeholder="Search..."
              className={`p-2 border-2 ${
                showSearch ? "w-full" : "w-80"
              } border-gray-300 rounded-lg`}
            />
          </div>

          {/* list items */}
          <ul
            className={`${
              showmenu
                ? "flex flex-col items-center justify-center w-full absolute top-20 left-0 bg-white shadow-lg"
                : "hidden"
            } lg:flex gap-x-10 font-bold text-gray-500 text-xl items-center`}
          >
            <li
              className={`${
                showmenu
                  ? "w-full my-6 hover:bg-gray-100 text-center p-4 rounded-lg"
                  : ""
              }`}
            >
              <Link to={"/"} className="hover:opacity-50">
                Home
              </Link>
            </li>
            <li
              className={`${
                showmenu
                  ? "w-full my-6 hover:bg-gray-100 text-center p-4 rounded-lg"
                  : ""
              }`}
            >
              <Link to={"/aboutus"} className="hover:opacity-50">
                About
              </Link>
            </li>
            <li
              className={`${
                showmenu
                  ? "w-full my-6 hover:bg-gray-100 text-center p-4 rounded-lg"
                  : ""
              }`}
            >
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-gray-500 font-medium rounded-lg text-sm text-center inline-flex items-center"
                    type="button"
                  >
                    <img
                      src={currentUser.user.avatar}
                      alt="profile"
                      className="rounded-full h-10 w-10 pointer"
                    />
                  </button>
                  {/* Dropdown menu */}
                  {showDropdown && (
                    <div
                      id="dropdown"
                      className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            // to="/signout"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signin" className="hover:opacity-50">
                  Signin
                </Link>
              )}
            </li>
          </ul>

          {/* search box and hamburger menu for mobile devices */}
          <div className="ml-auto right-4 lg:hidden text-xl flex items-center">
            <button
              onClick={toggleSearch}
              className="sm:hidden px-4 hover:opacity-50"
            >
              <IoSearch />
            </button>
            <button onClick={toggleMenu} className="hover:opacity-50">
              {showmenu ? <ImCross className="text-sm" /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
