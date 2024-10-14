import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useEditProduct = () => {
    const editProduct = async ({ data, onClose }) => {
      try {
        const response = await fetch(endPoint.editProduct.url, {
          method: endPoint.editProduct.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const jsonData = await response.json();
        if (jsonData.success) {
          toast.success(jsonData.message);
          onClose();
        }
        if (jsonData.error) {
          toast.error(jsonData.message);
        }        
        return jsonData;
      } catch (error) {
        toast.error(error);
      }
    };
    return editProduct;
}

