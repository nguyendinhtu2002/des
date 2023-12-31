import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { resetUser } from "../features/userSlide/userSlide";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.clear("access_token");
    localStorage.clear("refresh_token");
    window.location.reload();
  };
  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount?.toLocaleString(undefined, options);
  };
  const userLogin = useSelector((state) => state.user);
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class=" flex flex-wrap items-center justify-between  p-4">
        <Link href="/" class="flex items-center">
          <img src={logo} class="h-12 mr-3" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Mun Desiger
          </span>
        </Link>

        <div class="flex items-center md:order-2">
          <span class="block text-sm text-gray-900 dark:text-white mr-2">
            Số dư: {formattedAmount(userLogin?.money)}
          </span>{" "}
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://vpcs.kingmarketing.vn/template/DeskApp/vendors/images/photo1.jpg"
              alt="user photo"
            />
          </button>
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
          
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handleLogout}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
         
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
