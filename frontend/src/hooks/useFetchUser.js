import { useDispatch } from "react-redux";
import { endPoint } from "../helper/api";
import { addUser, isAutherized } from "../store/userSlice";
import { useFetchCartAllProduct } from "./useAllCartProduct";
import { useGetCartQuantity } from "./useGetCartQuantity";

export const useFetchUser = () => {
  const getAllCartProducts = useFetchCartAllProduct();
  const cartQuantity = useGetCartQuantity();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await fetch(endPoint.userDetails.url, {
        method: endPoint.userDetails.method,
        credentials: "include",
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        dispatch(addUser(jsonData.user));
        getAllCartProducts();
        cartQuantity();
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      dispatch(isAutherized(false));
    }
  };

  return fetchUser; // Return fetchUser function
};
