import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { useFetchCartAllProduct } from "./useAllCartProduct";
import { useGetCartQuantity } from "./useGetCartQuantity";

export const useReduceFromCart = () => {
  const getAllCartProducts = useFetchCartAllProduct();
  const cartQuantity = useGetCartQuantity();
  const fetchReduceCart = async (e, productId) => {
    try {
      e?.stopPropagation();
      e?.preventDefault();

      const res = await fetch(endPoint.reduceCartProduct.url, {
        method: endPoint.reduceCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId }), // Sending product ID to the API
      });

      const jsonData = await res.json();
      if (jsonData.success) {
        toast.success(jsonData.message);
        getAllCartProducts();
        cartQuantity();
      } else {
        toast.error(jsonData.message);
      }
      return jsonData;
    } catch (error) {
      toast.error("Failed to Remove Product from Cart..!");
    }
  };

  return fetchReduceCart;
};
