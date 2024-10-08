import React, { useState } from "react";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import { useUpdateUserDetails } from "../hooks/useUpdateUserDetails";
import { maskPassword } from "../helper/maskingUsersDetails";

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
    password: password,
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
    email: data.email,
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
      <div className="mx-auto bg-white border-2 border-yellow-400 shadow-md p-4 w-full max-w-sm rounded-md relative">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Update User Details</h1>

        <div className="flex flex-col gap-2">
          {isEditing ? (
            <div className="flex flex-row gap-2">
              <label htmlFor="name">Name : </label>
              <input
                id="name"
                value={data.name}
                onChange={handleChange}
                name="name"
                className="border-2 border-black"
              />
            </div>
          ) : (
            <p>Name : {data.name}</p>
          )}

          <p>Email : {email}</p>

          {isEditing ? (
            <div className="flex flex-row gap-2">
              <label htmlFor="phone">Phone : </label>
              <input
                id="phone"
                value={data.phone}
                name="phone"
                onChange={handleChange}
                className="border-2 border-black"
              />
            </div>
          ) : (
            <p>Phone : {data.phone}</p>
          )}

          {isEditing ? (
            <div className="flex flex-col gap-1">
              <label htmlFor="password">New Password : </label>
              <input
                id="newPassword"
                value={data.newPassword}
                name="newPassword"
                type="password"
                onChange={handleChange}
                placeholder="Enter new password"
                className="border-2 border-black"
              />
              <label htmlFor="confirmPassword">Confirm Password : </label>
              <input
                id="confirmPassword"
                value={data.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder="Confirm new password"
                className="border-2 border-black"
              />
            </div>
          ) : (
            <p>Password : {maskPassword(data?.password)}</p>
          )}

          {isEditing ? (
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img src={data.profilePic} alt="user-logo" />
              </div>

              <form>
                <label>
                  <div className="text-xs bg-opacity-75 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                    Update Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
              </form>
            </div>
          ) : (
            <img
              src={data.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full absolute right-10 top-10"
            />
          )}

          <div className="flex items-center justify-between">
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
