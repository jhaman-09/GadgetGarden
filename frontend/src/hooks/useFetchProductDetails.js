import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useFetchProductDetails = () => {
    const productDetails = async (paramId) => {
      // setLoading(true);
      const response = await fetch(endPoint.productDetails.url, {
        method: endPoint.productDetails.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: paramId,
        }),
      });

      const jsonData = await response.json();

      if (jsonData.error) {
        toast.error(jsonData.error);
        }
        return jsonData
    };
    return productDetails;
}

