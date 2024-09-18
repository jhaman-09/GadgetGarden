import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  
    if (!user) navigate("/");

  return (
    <div className="min-h-[calc(100vh-120px)] bg-white flex">
      <aside className="min-h-full w-full max-w-60 bg-white customShadow">
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="user-profilePic"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaCircleUser />
            )}
          </div>
          <p className="capitalize text-xl font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
