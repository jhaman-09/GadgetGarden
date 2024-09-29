import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchCartAllProduct_id = () => {
  const getAllCartProducts_id = async () => {
    try {
      const response = await fetch(endPoint.getAllCartProducts_id.url, {
        credentials: "include",
        method: endPoint.getAllCartProducts_id.method,
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
      return jsonData;
    } catch (error) {
      toast.error("Failed to get cart Products");
    }
  };
  return getAllCartProducts_id ;
};
