import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useDislikeProductReview = () => {
  const dislikeProductReview = async ({ productId, reviewId }) => {
    try {
      const response = await fetch(endPoint.dislikeReview.url, {
        method: endPoint.dislikeReview.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, reviewId }),
      });

      const jsonData = await response.json();
      if (jsonData.error) {
        toast(jsonData.message);
      }
      return jsonData
    } catch (error) {
      toast.error(error);
    }
  };
  return dislikeProductReview;
};
