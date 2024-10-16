import React, { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) navigate("/");
  },[user]) 

  return (
    <div className="h-full bg-white flex w-full">
      <aside className="min-h-full w-[240px] bg-white customShadow fixed">
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl cursor-pointer relative flex justify-center mt-3">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="user-profilePic"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaCircleUser className="w-20 h-20" />
            )}
          </div>
          <p className="capitalize text-xl font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div className="">
          <nav className="grid p-4">
            <Link
              to={"all-users"}
              className="px-3 py-1 min-w-[150px] hover:bg-slate-200 shadow-sm  hover:shadow-md border-black rounded-md"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-3 py-1 min-w-[150px] hover:bg-slate-200 shadow-sm hover:shadow-md  border-black rounded-md"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="h-screen ml-[240px] w-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
