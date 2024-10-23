import React, { useState } from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout.js";
import { removeUser } from "../store/userSlice.js";
const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { autherized, user, cartProducts } = useSelector((store) => store.user);

  const logout = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const jsonData = await logout();
    if (jsonData.success) {
      dispatch(removeUser());
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    if (searchValue || (searchValue && e.key === "Enter")) {
      navigate(`/search?keyword=${searchValue}`);
      setSearchValue("");
    } else {
      // alert("Please enter a search query");
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="container mx-auto h-full flex items-center px-5 justify-between">
        <div className="flex-shrink-0">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex pl-2 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Your Product Here.."
            className="w-full outline-none px-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ minWidth: "250px" }}
            // onKeyPress={handleSearch} // Trigger search on "Enter" key press
          />
          <div
            className="text-lg text-white bg-primary min-w-[50px] h-8 flex items-center justify-center cursor-pointer rounded-r-full"
            onClick={(e) => handleSearch(e)}
          >
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div
            className="flex justify-center relative group"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            <div className="text-3xl relative flex justify-center cursor-pointer transition-all">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt="user-profilePic"
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                user && <FaCircleUser className="w-10 h-10" />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit shadow-lg rounded-lg font-semibold">
                <nav>
                  {user?.role === "ADMIN" && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap  hidden md:block hover:bg-slate-100 p-2"
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
                    {(cartProducts &&
                      cartProducts.reduce(
                        (acc, cartItem) => acc + cartItem?.quantity,
                        0
                      )) ||
                      0}
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
