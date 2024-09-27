import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { useFetchUser } from "./useFetchUser";

export const useFetchDeleteProductFromCart = () => {
  const fetchUser = useFetchUser(); // Fetch the updated user/cart after adding the product

  const fetchReduceCart = async (e, productId) => {
    try {
      e?.stopPropagation();
      e?.preventDefault();

      const res = await fetch(endPoint.deleteCartProduct.url, {
        method: endPoint.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId }), // Sending product ID to the API
      });

      const jsonData = await res.json();
      if (jsonData.success) {
        toast.success(jsonData.message);
        fetchUser();
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {
      toast.error("Failed to Remove Product from Cart..!");
    }
  };

  return fetchReduceCart;
};
