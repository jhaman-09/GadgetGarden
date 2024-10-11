import React from "react";

const Review = ({ review, index }) => {
  return (
    <div key={review + index} className="mt-2">
      <span className="text-xs text-gray-500 flex gap-1 items-center">
        <img
          src={review?.reviewedByProfilePic || review?.commentedByProfilePic}
          alt="reviewedProfilePic"
          className="w-5 h-5 rounded-full"
        />
        <p>{review?.reviewedByUserName || review?.commentedByUserName}</p>
      </span>
      <p>- {review?.reviewText || review?.commentText}</p>
      <div className="pl-5 border border-l-black ml-5">
        {review?.comments?.map((comment, index) => (
          <>
            <Review review={comment} index={index} />
            <>
              {comment?.replies?.map((reply, index) => (
                <Review review={reply} index={index} />
              ))}
            </>
          </>
        ))}
      </div>
    </div>
  );
};

export default Review;
