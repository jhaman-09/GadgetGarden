import { toast } from "react-toastify";
import { endPoint } from "../helper/api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const useUpdateUserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateAllDetailsOfUser = async (PayloadToUpdate) => {
    const res = await fetch(endPoint.updateUser.url, {
      method: endPoint.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: PayloadToUpdate._id,
        role: PayloadToUpdate.role,
        name: PayloadToUpdate.name,
        profilePic: PayloadToUpdate.profilePic,
        confirmPassword: PayloadToUpdate.confirmPassword,
        newPassword: PayloadToUpdate.newPassword,
        phone: PayloadToUpdate.phone,
      }),
    });

    const jsonData = await res.json();
    if (jsonData?.success) {
      toast.success(jsonData.message);
      PayloadToUpdate.onClose();
      dispatch(addUser(jsonData.data));
      if (jsonData.data.role === "GENERAL") {
        navigate("/");
      }
    } else {
      toast.error(jsonData.message);
    }
    return jsonData;
  };

  return updateAllDetailsOfUser;
};
