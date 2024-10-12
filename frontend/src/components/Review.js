import React, { useState } from "react";
import { useCommentOnReview } from "../hooks/useCommentOnReview";
import { FaRegWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Review = ({ review, index, productId, setData}) => {
  const [addReply, setAddReply] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const commentOnReview = useCommentOnReview();

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmittingReply(true);
    const jsonData = await commentOnReview({
      commentText: commentText,
      productId,
      reviewId: index,
    });
    if (jsonData.success) {
      // reviews: {
      //   ...prev.reviews, // Spread the existing reviews object
      //   comments: jsonData.data.reviews.comments, // Update the comments with new data
      // },
      setData((prevData) => ({
        ...prevData,
        reviews: jsonData.data.reviews,
      }));
      console.log(jsonData);
    }
    setIsSubmittingReply(false);
    setAddReply(false); // Hide reply box after submitting
    setCommentText(""); // Clear input field
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

        <p>{review?.reviewedByUserName || review?.commentedByUserName}</p>
      </span>

      {/* Review or Comment Text */}
      <p className="flex gap-4 items-center">
        - {review?.reviewText || review?.commentText}{" "}
        {review?.reviewText && ( // only show in Review to reply
          <button
            onClick={() => setAddReply(true)} // Correct the onClick behavior
            className="p-1 px-2 bg-slate-200"
          >
            Reply
          </button>
        )}
      </p>

      {/* Reply Form */}
      {addReply && (
        <form
          onSubmit={(e) => handleCommentSubmit(e)}
          className="flex items-end gap-2 relative mt-2 transition-all"
        >
          <textarea
            placeholder="Your Review or Comment"
            className="border p-2 rounded"
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <p
            onClick={() => setAddReply(false)}
            className="relative text-red-600  mb-20"
          >
            <FaRegWindowClose />
          </p>

          <button
            type="submit"
            className={`bg-primary text-white py-1 px-2 absolute ml-8 rounded flex items-end ${
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
