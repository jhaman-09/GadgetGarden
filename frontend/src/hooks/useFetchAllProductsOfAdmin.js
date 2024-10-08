import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchAllProductsOfAdmin = () => {
    const adminAllUploadedProducts = async() => {
      const res = await fetch(endPoint.allProduct.url, {
        credentials: "include",
        method: endPoint.allProduct.method,
      });

      const jsonData = await res.json();
      if (jsonData.error) {
        toast.error(jsonData.message);
        } 
        return jsonData;
    }
    return adminAllUploadedProducts;
}

