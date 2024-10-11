import React from "react";
import { FaStar } from "react-icons/fa6";

const AddReview = ({ handleReviewSubmit, reviewInput, setReviewInput, isSubmittingReview }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Add a Review or Comment</h3>
      <form onSubmit={(e) => handleReviewSubmit(e)}>
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2 text-2xl">
            <p className="text-lg">Rating:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  star <= reviewInput.rating
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => setReviewInput({ ...reviewInput, rating: star })}
              />
            ))}
          </div>
          <textarea
            placeholder="Your Review or Comment"
            className="border p-2 rounded"
            rows={4}
            value={reviewInput.text}
            onChange={(e) =>
              setReviewInput({ ...reviewInput, text: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className={`bg-primary text-white py-2 px-4 rounded ${
              isSubmittingReview ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
