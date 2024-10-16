import { toast } from "react-toastify";
import { endPoint } from "../helper/api";

export const useReviewProduct = () => {
  const reviewProduct = async ({
    reviewId,
    replyText,
    productId,
    commentId,
  }) => {
    const res = await fetch(endPoint.replyComment.url, {
      method: endPoint.replyComment.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
        replyText,
        productId,
        commentId,
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
