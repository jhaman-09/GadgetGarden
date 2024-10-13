import express from "express";
import { authToken } from "../middlewares/auth.js";
import {
  addReviewOnProduct,
  allProductsOfThatCategory,
  commentOnReview,
  deleteReview,
  dislikedReview,
  editProduct,
  editReview,
  getAllProduct,
  getFilterProductsByCategory,
  getProductById,
  getProductsBySearch,
  likedReview,
  oneProductFromEachCategory,
  removeDislikedReview,
  removeLikedReview,
  replyToComment,
  uploadProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);
router.get("/all-product", authToken, getAllProduct);
router.post("/update-product", authToken, editProduct);
router.get("/category-product", oneProductFromEachCategory);
router.post("/products-by-category", allProductsOfThatCategory);
router.post("/product-details", getProductById);


// search Product using query
router.get("/search", getProductsBySearch)

// get Products according to given categories..
router.post("/filter-categories", getFilterProductsByCategory);


// Review And Comments on Reviews...
router.post("/review-product", authToken, addReviewOnProduct);

// Edit Its Own Review
router.put("/edit-review", authToken, editReview);

router.delete("/delete-review", authToken, deleteReview);

// Comment on any review of any product
router.post("/comment-review", authToken, commentOnReview);

// reply to the comment
router.post("/reply-comment", authToken, replyToComment);

// Like or Dislike Reviews...
router.post("/like-review", authToken, likedReview);

router.post("/remove-liked-review", authToken, removeLikedReview);

router.post("/dislike-review", authToken, dislikedReview);

router.post("/remove-disliked-review", authToken, removeDislikedReview)


export default router;
