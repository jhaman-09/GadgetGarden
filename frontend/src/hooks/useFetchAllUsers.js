import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchAllUsers = () => {
  const fetchAllUsers = async () => {
    const res = await fetch(endPoint.allUser.url, {
      method: endPoint.allUser.method,
      credentials: "include",
    });

    const jsonData = await res.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    }

    return jsonData;
  };
  return fetchAllUsers;
};
