import { useNavigate } from "react-router-dom";
import { endPoint } from "../helper/api";
import { useDispatch } from "react-redux";
import { isAutherized } from "../store/userSlice";
import { toast } from "react-toastify";

export const useLogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (e, data) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Not recommended for long-term storage
    try {
      const response = await fetch(endPoint.login.url, {
        method: endPoint.login.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token sent in headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const jsonData = await response.json();
      if (jsonData.error) {
        throw new Error(jsonData.message)
      }
      dispatch(isAutherized(true));
      toast.success(jsonData.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  return login;
};
