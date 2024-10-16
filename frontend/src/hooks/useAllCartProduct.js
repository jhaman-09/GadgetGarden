import { toast } from "react-toastify";
import { endPoint } from "../helper/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/userSlice";

export const useFetchCartAllProduct = () => {
  const dispatch = useDispatch();
  const getAllCartProducts = async () => {
    try {
      const response = await fetch(endPoint.getAllCartProduct.url, {
        credentials: "include",
        method: endPoint.getAllCartProduct.method,
      });

      const jsonData = await response.json();
      if (jsonData?.success) {
        dispatch(addToCart(jsonData.data));
      } else {
      }
      return jsonData;
    } catch (error) {
      toast.error("Failed to get cart Products");
    }
  };
  return getAllCartProducts;
};
