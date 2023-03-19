import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineBars,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userIcon, showUserIcon] = useState(false);
  const iconUser = useRef(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (iconUser.current && !iconUser.current.contains(event.target)) {
      showUserIcon(false);
    }
  };
  return (
    <nav
      className={
        "top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <nav
            className="navbar  navbar-expand-lg "
            style={{ backgroundColor: "#111827" }}
          >
            <div className="container">
              <Link to="/">
                <p className="navbar-brand">
                  <img
                    src="/static/ct.png"
                    alt="Facebook"
                    width="200px"
                    height="30px"
                  />
                </p>
              </Link>
            </div>
          </nav>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? (
              <AiOutlineClose className="text-white" />
            ) : (
              <AiOutlineBars className="text-white" />
            )}
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center  lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {isLoggedIn && (
              <li
                ref={iconUser}
                className="flex justify-center items-center sm:p-3 relative"
              >
                <p className="text-2xl text-gray-300 mr-2">
                  {user.name}
                </p>
                <AiOutlineUser
                  onClick={() => showUserIcon(userIcon ? false : true)}
                  className="text-2xl text-gray-300 cursor-pointer"
                />
                <div
                  className={`absolute rounded p-1 bg-gray-700 top-2 left-0 right-0 transition ease-in flex flex-row justify-center items-center ${
                    userIcon
                      ? "visible opacity-100 translate-y-10"
                      : "invisible opacity-0 translate-y-0"
                  }`}
                >
                  <AiOutlineLogout className="text-white text-2xl cursor-pointer font-bold" />
                  <span
                    onClick={handleLogout}
                    className="cursor-pointer text-white text-xl ml-2 font-bold"
                  >
                    Logout
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
