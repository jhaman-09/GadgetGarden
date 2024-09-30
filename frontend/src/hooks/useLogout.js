import { toast } from "react-toastify";
import { endPoint } from "../helper/api";
import { useDispatch } from "react-redux";
import {
  isAutherized,
  removeUser,
  removeCart,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
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
        dispatch(removeUser());
        dispatch(isAutherized(false));
        dispatch(removeCart());
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return logout;
};
