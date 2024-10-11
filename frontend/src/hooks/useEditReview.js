import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useEditReview = () => {
  const editReview = async ({ rating, reviewText, productId, reviewId }) => {
    const res = await fetch(endPoint.editReview.url, {
      method: endPoint.editReview.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        reviewText,
        productId,
        reviewId,
      }),
    });

    const jsonData = await res.json();
    if (jsonData.error) {
      toast.error(jsonData.message);
    }
    if (jsonData.success) {
      toast(jsonData.message);
    }
    return jsonData;
  };
  return editReview;
};
