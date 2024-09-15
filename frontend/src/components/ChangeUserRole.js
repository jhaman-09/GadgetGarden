import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { endPoint } from "../helper/api";
import {toast} from 'react-toastify'

const ChangeUserRole = ({ name, email, role, _id, onClose, CallToFetchAllUserAgain }) => {
  const [userRole, setUserRole] = useState(role);

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleUpdateUserRole = async () => {
    try {
      const res = await fetch(endPoint.updateUser.url, {
        method: endPoint.updateUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          role: userRole,
        }),
      });

      const jsonData = await res.json();
      if (jsonData.success) {
        toast.success(jsonData.message);
        onClose();
        CallToFetchAllUserAgain()
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {}
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-yellow-200 shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select value={userRole} onChange={handleChange}>
            <option value={userRole === "GENERAL" ? userRole : "ADMIN"}>
              {userRole === "GENERAL" ? userRole : "ADMIN"}
            </option>
            <option value={userRole === "GENERAL" ? "ADMIN" : "GENERAL"}>
              {userRole === "GENERAL" ? "ADMIN" : "GENERAL"}
            </option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-[#9F2B68] text-white hover:bg-[#c20d6d]"
          onClick={handleUpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
