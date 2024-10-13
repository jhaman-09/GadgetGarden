import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useRemoveLikeProductReview = () => {
  const removeLikeProductReview = async ({ productId, reviewId }) => {
    try {
      const response = await fetch(endPoint.removeLikedReview.url, {
        method: endPoint.removeLikedReview.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, reviewId }),
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        toast.success(jsonData.message);
      }
      if (jsonData.error) {
        toast.error(jsonData.message);
      }
      return jsonData
    } catch (error) {
      toast.error(error);
    }
  };
  return removeLikeProductReview;
};
