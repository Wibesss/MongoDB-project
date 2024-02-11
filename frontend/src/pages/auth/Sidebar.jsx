import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
  AiFillHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../products/FavoritesCount";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    if (dropdownOpen) setDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandle = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error.data);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`flex flex-col  justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed`}
      id="navigation-container"
      onClick={closeDropdown}
    >
      <div className="flex flex-col justfy-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="ml-4 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name ml-4 mt-[3rem]">HOME</span>
          </div>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="ml-4 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name ml-4 mt-[3rem]">SHOP</span>
          </div>
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-4"
        >
          <div className="flex items-center">
            <AiOutlineShoppingCart className="ml-4 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name ml-4 mt-[3rem]">
              CART
            </span>{" "}
          </div>

          <div className="absolute left-2 top-9 flex">
            {cartItems.length > 0 && (
              <span>
                <span
                  className={`ml-6 px-1 py-0 text-sm bg-pink-500 rounded-full`}
                >
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link
          to="/favorites"
          className="flex items-center transition-transform transform hover:translate-x-4"
        >
          <div className="flex justify-center">
            <AiFillHeart className="ml-4 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name ml-4 mt-[3rem]">
              FAVORITE
            </span>
          </div>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white hover:text-pink-600">
              {userInfo.username}
            </span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1  ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-pink-500 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/addproduct"
                    className="block px-4 py-2 hover:bg-pink-200"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/allproductslist"
                    className="block px-4 py-2 hover:bg-pink-200"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-pink-200"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-pink-200"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-pink-200"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-pink-200">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandle}
                className="block w-full px-4 py-2 text-left hover:bg-pink-200"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUsergroupAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Register</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
