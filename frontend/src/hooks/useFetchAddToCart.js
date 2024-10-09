import { endPoint } from "../helper/api.js";
import { toast } from "react-toastify";
import { useFetchCartAllProduct } from "./useAllCartProduct.js";

export const useFetchAddToCart = () => {
  const getAllCartProducts = useFetchCartAllProduct();
  const fetchAddToCart = async (e, productId) => {
    try {
      e?.stopPropagation();
      e?.preventDefault();

      const res = await fetch(endPoint.addToCart.url, {
        method: endPoint.addToCart.method,
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
      } else if (jsonData.error) {
        toast(jsonData.message);
      }

      return jsonData;
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  return fetchAddToCart;
};
