import React, { useEffect, useState } from "react";
import { useCommentOnReview } from "../hooks/useCommentOnReview";
import { FaRegWindowClose } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useLikeProductReview } from "../hooks/useLikeProductReview";
import { useRemoveDislikeProductReview } from "../hooks/useRemoveDislikeProductReview";
import { useDislikeProductReview } from "../hooks/useDislikeProductReview";
import { useRemoveLikeProductReview } from "../hooks/useRemoveLikeProductReview";

const Review = ({ review, index, productId, setData, data }) => {
  const [addReply, setAddReply] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [likeCount, setLikeCount] = useState(review.likeReview || 0);
  const [dislikeCount, setDislikeCount] = useState(review.dislikeReview || 0);

  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const commentOnReview = useCommentOnReview();

  const handleCommentSubmit = async (e) => {
    e?.preventDefault(); // Prevent default form submission
    setIsSubmittingReply(true);
    const jsonData = await commentOnReview({
      commentText: commentText,
      productId,
      reviewId: index,
    });
    if (jsonData.success) {
      setData((prevData) => ({
        ...prevData,
        reviews: jsonData.data.reviews,
      }));
    }
    setIsSubmittingReply(false);
    setAddReply(false); // Hide reply box after submitting
    setCommentText(""); // Clear input field
  };

  const likeProductReview = useLikeProductReview();
  const dislikeProductReview = useDislikeProductReview();
  const removeLikeProductReview = useRemoveLikeProductReview();
  const removeDislikeProductReview = useRemoveDislikeProductReview();

  const handleLike = async () => {
    if (isLike) {
      const jsonData = await removeLikeProductReview({
        productId,
        reviewId: index,
      });

      if (jsonData.success) {
        setIsLike(false);
        setLikeCount(jsonData.data.reviews[index].likeReview);
      }
    }
    // two condition here, 1) only just do like without touching dislike button
    //                     2) remove dislike and do like
    else {
      // here do like and
      const jsonData = await likeProductReview({ productId, reviewId: index });
      if (jsonData.success) {
        setIsLike(true);
        setLikeCount(jsonData.data.reviews[index].likeReview);
        // and here if dislike allready then remove it..
        if (isDislike) {
          const jsonData = await removeDislikeProductReview({
            productId,
            reviewId: index,
          });
          if (jsonData.success) {
            setDislikeCount(jsonData.data.reviews[index].dislikeReview);
            setIsDislike(false);
          }
        }
      }
    }
  };

  const handleDislike = async () => {
    if (isDislike) {
      const jsonData = await removeDislikeProductReview({
        productId,
        reviewId: index,
      });
      if (jsonData.success) {
        setIsDislike(false);
        setDislikeCount(jsonData.data.reviews[index].dislikeReview);
      }
    }

    // two condition here, 1) only just do dislike without touching like button
    //                     2) remove like and do dislike
    else {
      // do dislike and..
      const jsonData = await dislikeProductReview({
        productId,
        reviewId: index,
      });
      if (jsonData.success) {
        setIsDislike(true);
        setDislikeCount(jsonData.data.reviews[index].dislikeReview);
        // if like aualible then remove like
        if (isLike) {
          const jsonData = await removeLikeProductReview({
            productId,
            reviewId: index,
          });
          if (jsonData.success) {
            setIsLike(false);
            setLikeCount(jsonData.data.reviews[index].likeReview);
          }
        }
      }
    }
  };

  return (
    <div key={index} className="mt-2">
      {/* User Info */}
      <span className="text-xs text-gray-500 flex gap-1 items-center">
        {review?.reviewedByProfilePic || review?.commentedByProfilePic ? (
          <img
            src={review?.reviewedByProfilePic || review?.commentedByProfilePic}
            alt="reviewedProfilePic"
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-5 h-5" />
        )}

        <p className="flex gap-5 items-center">
          {review?.reviewedByUserName || review?.commentedByUserName}
          <p className="flex gap-5 text-base items-center cursor-pointer">
            {review?.reviewText && (
              <>
                <div className="flex items-center gap-2">
                  {/* Like and Dislike Buttons */}
                  <AiOutlineLike
                    className={isLike ? "text-primary" : ""}
                    onClick={handleLike}
                  />
                  <span>{likeCount}</span>

                  <AiOutlineDislike
                    className={isDislike ? "text-primary" : ""}
                    onClick={handleDislike}
                  />
                  <span>{dislikeCount}</span>
                </div>
              </>
            )}
          </p>
        </p>
      </span>

      {/* Review or Comment Text */}
      <p className="flex gap-4 items-center">
        - {review?.reviewText || review?.commentText}{" "}
        {review?.reviewText && ( // only show in Review to reply
          <button
            onClick={() => setAddReply(true)} // Correct the onClick behavior
            className="py-1 px-2 bg-slate-200 rounded-sm"
          >
            Reply
          </button>
        )}
      </p>

      {/* Reply Form */}
      {addReply && (
        <form
          onSubmit={(e) => handleCommentSubmit(e)}
          className="flex flex-col gap-2 relative mt-2 transition-all"
        >
          <textarea
            placeholder="Your Review or Comment"
            className="border p-2 rounded md:w-52 w-72 md:h-16 h-20 "
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <p
            onClick={() => setAddReply(false)}
            className="text-red-600 absolute md:left-52 left-72 px-2 cursor-pointer"
          >
            <FaRegWindowClose />
          </p>

          <button
            type="submit"
            className={`bg-primary text-white py-1 px-2 rounded md:w-52 w-72 ${
              isSubmittingReply ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmittingReply}
          >
            {isSubmittingReply ? "Submitting..." : "Submit Reply"}
          </button>
        </form>
      )}

      {/* Nested Comments and Replies */}
      <div className="pl-5 border border-l-black ml-5">
        {review?.comments?.map((comment, idx) => (
          <div key={idx}>
            <Review review={comment} index={idx} productId={productId} />
            {comment?.replies?.map((reply, replyIdx) => (
              <Review
                review={reply}
                index={replyIdx}
                productId={productId}
                key={replyIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
