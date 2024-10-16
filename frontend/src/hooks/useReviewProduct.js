import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useReviewProduct = () => {
  const reviewProduct = async ({ rating, reviewText, productId }) => {
    const res = await fetch(endPoint.addReview.url, {
      method: endPoint.addReview.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        reviewText,
        productId,
      }),
    });

    const jsonData = await res.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    }
    if (jsonData?.success) {
      toast(jsonData.message);
    }
    return jsonData;
  };
  return reviewProduct;
};
