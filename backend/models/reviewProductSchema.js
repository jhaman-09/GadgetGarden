// I want o add review section in every product ....
// user can give its rating and as well review that product too
// well next any then product who wants to share the thaught as well on that product or on that review😊😊

// so that, i have create the review schema first for reating and review

import mongoose from "mongoose";

// for comment on review part
const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: [true, "Please provide a comment"],
    },

    commentedBy: {
      userName: {
        type: String,
        required: true,
        default: "Anonymous User", // Default name
      },
      profilePic: {
        type: String, // URL or path to profile picture
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },

    replies: {
      type: [this],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// for product review
export const reviewProductSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please Provide a rating.."],
      min: 1,
      max: 5,
    },

    reviewText: {
      type: String,
      required: [true, "Please Provide a review text"],
    },

    reviewedBy: {
      userName: {
        type: String,
        required: true,
        default: "Anonymous User", // Default name
      },
      profilePic: {
        type: String, // URL or path to profile picture
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },

    comments: [commentSchema], // embed comments in each review

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Don't create a separate _id for each review
);
