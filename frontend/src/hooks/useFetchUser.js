import { useDispatch } from "react-redux";
import { endPoint } from "../helper/api";
import {
  addToCart,
  addUser,
  isAutherized,
  isCartSize,
} from "../store/userSlice";
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
        const updatedCart = await getAllCartProducts();
        const updatedCartQuantity = await cartQuantity();
        dispatch(addToCart(updatedCart.data));
        dispatch(isCartSize(updatedCartQuantity.data));
        dispatch(addUser(jsonData.user));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      dispatch(isAutherized(false));
    }
  };

  return fetchUser; // Return fetchUser function
};
