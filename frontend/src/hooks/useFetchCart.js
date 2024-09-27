import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { useFetchUser } from "./useFetchUser.js";

export const useFetchAddToCart = () => {
  const fetchUser = useFetchUser(); // Fetch the updated user/cart after adding the product

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
        fetchUser();
      } else if (jsonData.error) {
        toast.error(jsonData.message);
      }

      return jsonData;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  return { fetchAddToCart };
};
