import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers.js";
import UpdateUserDetails from "../components/UpdateUserDetails.js";
import {
  maskEmail,
  maskName,
  maskPhoneNumber,
} from "../helper/maskingUsersDetails.js";
import { useSelector } from "react-redux";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [updateRole, setUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    password: "",
    phone: "",
    profilePic: "",
    _id: "",
  });

  const { user } = useSelector((store) => store.user);

  const fetchAllUsers = useFetchAllUsers();

  const handleFetchUsers = async () => {
    const jsonData = await fetchAllUsers();
    if (jsonData.success) {
      setUsers(jsonData.users);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <div className="bg-white pb-4 ">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>SR.</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>Phone</th>
            <th>CREATAED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{1}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
            <td>{user?.phone}</td>
            <td>{moment(user?.updatedAt).format("LL")}</td>
            <td className="p-2">
              <button
                className="bg-green-500 p-2 cursor-pointer hover:bg-green-600 hover:text-slate-800 rounded-sm"
                onClick={() => {
                  setUpdateUserDetails(user);
                  setUpdateRole(true);
                }}
              >
                <MdModeEdit />
              </button>
            </td>
          </tr>
          {users &&
            users.map((ele, index) => {
              const isNotCurrentUser = ele?._id.toString() !== user?._id.toString();
              return !isNotCurrentUser ? null : (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{maskName(ele.name)}</td>
                  <td>{maskEmail(ele?.email)}</td>
                  <td>{ele?.role}</td>
                  <td>{maskPhoneNumber(ele?.phone)}</td>
                  <td>{moment(ele?.updatedAt).format("LL")}</td>
                  <td className="p-2">
                    <button
                      className="bg-green-500 p-2 cursor-pointer hover:bg-green-600 hover:text-slate-800 rounded-sm"
                      onClick={() => {
                        setUpdateUserDetails(ele);
                        setUpdateRole(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {updateRole && (
        <UpdateUserDetails
          onClose={() => setUpdateRole(false)}
          name={updateUserDetails?.name}
          email={updateUserDetails?.email}
          role={updateUserDetails?.role}
          _id={updateUserDetails?._id}
          phone={updateUserDetails?.phone}
          password={updateUserDetails?.password}
          profilePic={updateUserDetails?.profilePic}
          CallToFetchAllUserAgain={handleFetchUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
