import React, { useEffect, useState } from "react";
import { endPoint } from "../helper/api.js";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole.js";


const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [updateRole, setUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id : ""
  })

  const fetchUsers = async () => {
    const res = await fetch(endPoint.allUser.url, {
      method: endPoint.allUser.method,
      credentials: "include",
    });


    const jsonData = await res.json();    

    if (jsonData.success) {
      setUsers(jsonData.alluser);
    }
    if (jsonData.error) {
      toast.error(jsonData.message);
    }
  };

  useEffect(() => {
    fetchUsers();
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
            <th>CREATAED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele?.name}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.role}</td>
                  <td>{moment(ele?.updatedAt).format("LL")}</td>
                  <td className="p-2">
                    <button
                      className="bg-green-500 p-2 cursor-pointer hover:bg-green-600 hover:text-slate-800 rounded-sm"
                      onClick={() => {
                        setUpdateUserDetails(ele)
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
        <ChangeUserRole
          onClose={() => setUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          _id={updateUserDetails._id}
          CallToFetchAllUserAgain={fetchUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
