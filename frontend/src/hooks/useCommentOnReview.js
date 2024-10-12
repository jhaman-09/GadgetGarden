import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useCommentOnReview = () => {
  const commentOnReview = async ({ commentText, productId, reviewId }) => {
    const res = await fetch(endPoint.commentOnReview.url, {
      method: endPoint.commentOnReview.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentText,
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
  return commentOnReview;
};
