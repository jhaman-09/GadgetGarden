import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useUpdateUserDetails } from "../hooks/useUpdateUserDetails";

const UpdateUserDetails = ({name, email, password, profilePic, role, _id, onClose, CallToFetchAllUserAgain}) => {
  const [userRole, setUserRole] = useState(role);

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  const PayloadToUpdate = {
    name: name,
    role: userRole,
    _id: _id,
    password: password,
    profilePic: profilePic,
    onClose: onClose,
  };

  const updateAllDetailsOfUser = useUpdateUserDetails();

  const handleUpdateUserRole = async () => {
    const jsonData = await updateAllDetailsOfUser(PayloadToUpdate);
    if (jsonData.success) {
      setUserRole(jsonData.data.role);
      CallToFetchAllUserAgain();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white border-2 border-yellow-400 shadow-md p-4 w-full max-w-sm rounded-md">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select
            value={userRole}
            onChange={handleChange}
            className="border-2 border-yellow-400 rounded"
          >
            <option value={userRole === "GENERAL" ? userRole : "ADMIN"}>
              {userRole === "GENERAL" ? userRole : "ADMIN"}
            </option>
            <option value={userRole === "GENERAL" ? "ADMIN" : "GENERAL"}>
              {userRole === "GENERAL" ? "ADMIN" : "GENERAL"}
            </option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-white text-black animate-glow p-6 border-2 border-yellow-500"
          onClick={handleUpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
