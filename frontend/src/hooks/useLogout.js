import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useLogout = () => {
  const logout = async () => {
    const response = await fetch(endPoint.logout.url, {
      method: endPoint.logout.method,
      credentials: "include",
    });

    const jsonData = await response.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    } else {
      toast.success(jsonData.message);
    }
    return jsonData;
  };
  return logout;
};
