import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchedAllProducts = () => {
  const fetchAllProducts = async () => {
    const res = await fetch(endPoint.allProducts.url, {
      method: endPoint.allProducts.method,
      credentials: "include",
    });

    const jsonData = await res.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    }

    return jsonData;
  };
  return fetchAllProducts;
};
