import React, { useState } from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout.js";
const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const { autherized, user, cartProducts } = useSelector((store) => store.user);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
   await logout();
  };

  const handleSearch = (e) => {
    if (searchValue) {
      navigate(`/search?keyword=${searchValue}`);
      setSearchValue("")
    }
    else {
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="container mx-auto h-full flex items-center px-5 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex pl-2 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Your Product Here.."
            className="w-full outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="text-lg text-white bg-primary min-w-[50px] h-8 flex items-center justify-center rounded-r-full"
          onClick={() => handleSearch()}>
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div
            className="flex justify-center relative group"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            <div className="text-3xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt="user-profilePic"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                user && <FaCircleUser />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-1 shalg rounded">
                <nav>
                  {user?.role === "ADMIN" && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    >
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
                <div className="bg-primary text-white w-5 h-5 p-2 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">
                    {cartProducts &&
                      cartProducts.reduce(
                        (acc, cartItem) => acc + cartItem?.quantity,
                        0
                      )}
                  </p>
                </div>
              </span>
            </Link>
          )}

          <div>
            {autherized ? (
              <Link
                className="px-3 py-1 rounded-full text-white  bg-primary hover:bg-secondary"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-primary hover:bg-secondary"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
