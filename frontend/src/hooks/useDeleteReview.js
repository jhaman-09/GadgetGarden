import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useReviewProduct = () => {
  const reviewProduct = async ({ reviewId, productId }) => {
    const res = await fetch(endPoint.deleteReview.url, {
      method: endPoint.deleteReview.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
        productId,
      }),
    });

    const jsonData = await res.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    }
    if (jsonData.success) {
      toast(jsonData.message);
    }
  };
  return reviewProduct;
};
