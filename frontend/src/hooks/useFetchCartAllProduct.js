import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchCartAllProduct = () => {
  const getAllCartProducts = async () => {
    try {
      const response = await fetch(endPoint.getAllCartProduct.url, {
        credentials: "include",
        method: endPoint.getAllCartProduct.method,
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
  return { getAllCartProducts };
};
