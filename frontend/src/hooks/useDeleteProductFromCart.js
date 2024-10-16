import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { useFetchCartAllProduct } from "./useAllCartProduct";

export const useFetchDeleteProductFromCart = () => {
  const getAllCartProducts = useFetchCartAllProduct();
  const fetchDeleteProduct = async (e, productId) => {
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
      if (jsonData?.success) {
        toast.success(jsonData.message);
        getAllCartProducts();
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {
      toast.error("Failed to Remove Product from Cart..!");
    }
  };

  return fetchDeleteProduct;
};
