import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useRemoveDislikeProductReview = () => {
  const removeDislikeProductReview = async ({ productId, reviewId }) => {
    try {
      const response = await fetch(endPoint.removeDislikedReview.url, {
        method: endPoint.removeDislikedReview.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, reviewId }),
      });

      const jsonData = await response.json();
      if (jsonData.error) {
        toast.error(jsonData.message);
      }
      return jsonData;
    } catch (error) {
      toast.error(error);
    }
  };
  return removeDislikeProductReview;
};
