import { useNavigate } from "react-router-dom";
import { endPoint } from "../helper/api";
import { toast } from "react-toastify";

export const useSignUp = () => {
  const navigate = useNavigate();
  const signUp = async (e, data) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const res = await fetch(endPoint.register.url, {
        method: endPoint.register.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const jsonData = await res.json();
      if (jsonData.error) {
        toast.error(jsonData.message);
        throw new Error(jsonData.message);
      } else {
        toast.success(jsonData.message);
        navigate("/login");
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };
  return signUp;
};
