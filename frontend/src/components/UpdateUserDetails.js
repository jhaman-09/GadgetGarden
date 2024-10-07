import React, { useState } from "react";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import { useUpdateUserDetails } from "../hooks/useUpdateUserDetails";

const UpdateUserDetails = ({
  name,
  email,
  phone,
  profilePic,
  role,
  _id,
  onClose,
  password,
  CallToFetchAllUserAgain,
}) => {
  
  const [data, setData] = useState({
    role: role,
    email: email, // for validation
    name: name,
    phone: phone,
    confirmPassword: "",
    newPassword: "",
    profilePic: profilePic,
  });

  // const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prevState) => ({
        ...prevState,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const PayloadToUpdate = {
    name: data.name,
    role: data.role,
    _id: _id,
    email : data.email,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
    profilePic: data.profilePic,
    phone: data.phone,
    onClose: onClose,
  };

  const updateAllDetailsOfUser = useUpdateUserDetails();

  const handleUpdateUserRole = async () => {
    const jsonData = await updateAllDetailsOfUser(PayloadToUpdate);
    if (jsonData.success) {
      CallToFetchAllUserAgain();
      setIsEditing(false); // Close editing mode
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white border-2 border-yellow-400 shadow-md p-4 w-full max-w-sm rounded-md">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Update User Details</h1>

        {isEditing ? (
          <div className="flex justify-between">
            <label htmlFor="name">Name : </label>
            <input
              id="name"
              value={data.name}
              onChange={handleChange}
              name="name"
            />
          </div>
        ) : (
          <p>Name : {data.name}</p>
        )}

        <p>Email : {email}</p>

        <div className="flex">
          <label htmlFor="phone">Phone : </label>
          {isEditing ? (
            <input
              id="phone"
              value={data.phone}
              name="phone"
              onChange={handleChange}
            />
          ) : (
            <p>{data.phone}</p>
          )}
        </div>

        {isEditing ? (
          <div>
            <label htmlFor="password">New Password : </label>
            <input
              id="newPassword"
              value={data.newPassword}
              name="newPassword"
              type="password"
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <label htmlFor="confirmPassword">Confirm Password : </label>
            <input
              id="confirmPassword"
              value={data.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>
        ) : (
          <p>Password : {data.password}</p>
        )}

        {isEditing ? (
          <div className="flex justify-between">
            <label htmlFor="profilePic">Profile:</label>
            <input
              id="profilePic"
              type="file"
              onChange={handleProfilePicChange}
              className="border-2 border-yellow-400 rounded"
            />
            {data.profilePic && (
              <img
                src={data.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>
        ) : (
          <img
            src={data.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        )}

        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select
            value={data.role}
            name="role"
            onChange={handleChange}
            className="border-2 border-yellow-400 rounded"
          >
            <option value={data?.role === "GENERAL" ? data?.role : "ADMIN"}>
              {data?.role === "GENERAL" ? data?.role : "ADMIN"}
            </option>
            <option value={data?.role === "GENERAL" ? "ADMIN" : "GENERAL"}>
              {data?.role === "GENERAL" ? "ADMIN" : "GENERAL"}
            </option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-white text-black animate-glow p-6 border-2 border-yellow-500"
          onClick={isEditing ? handleUpdateUserRole : handleToggle}
        >
          {isEditing ? "Save Changes" : <IoMdCreate />}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
