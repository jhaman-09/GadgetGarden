import { endPoint } from "../helper/api.js";
import { toast } from "react-toastify";
import { useFetchCartAllProduct } from "./useAllCartProduct.js";
import { useDispatch } from "react-redux";
import { addToCart, isCartSize } from "../store/userSlice.js";
import { useGetCartQuantity } from "./useGetCartQuantity.js";

export const useFetchAddToCart = () => {
  const getAllCartProducts = useFetchCartAllProduct();
  const cartQuantity = useGetCartQuantity();
  const dispatch = useDispatch();
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
        const updatedCart = getAllCartProducts();
        const updatedCartQuantity = cartQuantity();
        console.log("updated card",updatedCart?.data);
        
        dispatch(addToCart(updatedCart.data));
        dispatch(isCartSize(updatedCartQuantity.data));
      } else if (jsonData.error) {
        toast.error(jsonData.message);
      }

      return jsonData;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  return fetchAddToCart ;
};
