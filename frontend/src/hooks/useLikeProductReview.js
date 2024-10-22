import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useLikeProductReview = () => {
  const likeProductReview = async ({ productId, reviewId }) => {
    try {
      const response = await fetch(endPoint.likeReview.url, {
        method: endPoint.likeReview.method,
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
  return likeProductReview;
};
