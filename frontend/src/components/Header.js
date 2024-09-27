import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { isAutherized, removeUser } from "../store/userSlice.js";
import { useFetchAddToCart } from "../hooks/useFetchCart.js";

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { autherized, user } = useSelector((store) => store.user);

  const [cart, setCart] = useState([]);
  const [cartLen, setCartLen] = useState(0);

  const { fetchAddToCart } = useFetchAddToCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(endPoint.logout.url, {
        method: endPoint.logout.method,
        credentials: "include",
      });

      const data = await response.json();
      if (data.error) {
        toast.error(data.message);
        throw new Error(data.message);
      } else {
        toast.success(data.message);
        setCartLen(0);
        dispatch(removeUser());
        dispatch(isAutherized(false));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // { cart with productId and quantity}
  const fetchCartProducts = async () => {
    try {
      const res = await fetch(endPoint.getAllCartProduct.url, {
        method: endPoint.getAllCartProduct.method,
        credentials: "include",
      });

      const jsonData = await res.json();
      const cartData = Array.isArray(jsonData.data) ? jsonData.data : [];
      setCart(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  // {calculating product quantities}
  const handleCartLength = async () => {
    let len = 0;
    cart.forEach((product) => {
      len += product.quantity;
    });
    setCartLen(len);
  };

  useEffect(() => {
    fetchCartProducts();
    handleCartLength();
  }, [fetchAddToCart]);

  

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
            className="w-full outline-none "
          />
          <div className="text-lg text-white bg-primary min-w-[50px] h-8 flex items-center justify-center rounded-r-full">
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
                  src={user.profilePic}
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
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
              <div className="bg-primary text-white w-5 h-5 p-2 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{cartLen}</p>
              </div>
            </span>
          </div>

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
