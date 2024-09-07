import React from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
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
            className="w-full outline-none "
          />
          <div className="text-lg text-white bg-[#9F2B68] min-w-[50px] h-8 flex items-center justify-center rounded-r-full">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaCircleUser />
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
              <div className="bg-[#9F2B68] text-white w-4 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">0</p>
              </div>
            </span>
          </div>

          <div>
            <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-[#9F2B68] hover:bg-[#c20d6d]">login</Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
