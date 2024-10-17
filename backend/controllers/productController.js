import { Product } from "../models/productSchema.js";
import onlyAdminUploadProduct from "../middlewares/isRoleAdmin.js";
import onlyAdminUploadProudct from "../middlewares/isRoleAdmin.js";

export const allProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "All Products Found",
      data: products,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Server Error..!",
      error: true,
      success: false,
    });
  }
};

export const uploadProduct = async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    } = req.body;

    if (
      !productName ||
      !brandName ||
      !category ||
      !productImage ||
      !description ||
      !price ||
      !sellingPrice
    ) {
      throw new Error("Please Fill the product details Properly");
    }

    if (!onlyAdminUploadProduct(req.user._id)) {
      throw new Error("Access Denied...!");
    }

    const sellingPricePercent = (sellingPrice / price) * 100;
    const discount = 100 - sellingPricePercent;

    const productSave = await Product.create({
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
      discount,
      uploadedBy: _id,
    });

    res.status(200).json({
      success: true,
      message: "Product uploaded successfully!",
      data: productSave,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Server Error..!",
      error: true,
      success: false,
    });
  }
};

export const getAllProductsUploaded = async (req, res) => {
  try {
    const { _id } = req.user;
    const allProducts = await Product.find({ uploadedBy: _id });

    res.status(200).json({
      data: allProducts,
      message:
        allProducts.length !== 0
          ? "Product Found Successfully...!"
          : "Oops! No Product Found",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    if (!onlyAdminUploadProudct(req.user._id)) {
      // Checking role Admin or Not
      throw new Error("Access Denied...!");
    }
    const { _id, price, sellingPrice, discount, ...dataToUpdate } = req.body; // Product _id
    if (price || sellingPrice) {
      dataToUpdate.discount = ((price - sellingPrice) / price) * 100; // Calculate percentage discount
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        sellingPrice,
        price,
        ...dataToUpdate,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Product update successfully..!",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const oneProductFromEachCategory = async (req, res) => {
  try {
    // Step 1: Fetch distinct categories from the products
    const categoriesArray = await Product.distinct("category");

    // Step 2: Initialize an array to hold one product from each category
    const productsFromEachCategory = [];

    // Step 3: Loop through each category and fetch one product
    for (const category of categoriesArray) {
      const product = await Product.findOne({ category });
      if (product) {
        productsFromEachCategory.push(product);
      }
    }

    // Step 4: Return the array of selected products as the response

    return res.status(200).json({
      message: "Product found from each category..!",
      data: productsFromEachCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const allProductsOfThatCategory = async (req, res) => {
  try {
    const { category } = req.body || req.query; // post req to send category or take from url query part

    if (!category) {
      throw new Error("Please select a category...!");
    }

    const products = await Product.find({ category });

    if (!products) {
      throw new Error("No Products Found..!");
    }

    res.status(200).json({
      data: products,
      message: "Products found successfully..!",
      error: false,
      succee: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      throw new Error("Error While fetching Product Details..!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product Not Found..");
    }
    res.status(200).json({
      data: product,
      message: "Product found successfully...!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductsBySearch = async (req, res) => {
  try {
    const { keyword } = req.query;

    // Create a regular expression for case-insensitive matching
    const regex = new RegExp(keyword, "i", "g");

    const products = await Product.find({
      /* from where, we want to find product {through name, description, category where these keyword present,
       it will will me those products} */
      $or: [{ productName: regex }, { category: regex }, { brandName: regex }],
    });

    res.status(200).json({
      message: "Product found successfully..!",
      data: products,
      error: false,
      succee: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getFilterProductsByCategory = async (req, res) => {
  try {
    const categoriesArray = req.body.categoriesArray || [];
    if (!categoriesArray) {
      throw new Error("Please Provide a Valid Category");
    }

    // extract products through category from element of categoriesArray (providing through post route)
    const products = await Product.find({
      category: {
        $in: categoriesArray, // product through categoriesArray elements
      },
    });

    if (!products) {
      throw new Error("No Data Found..!");
    }

    res.status(200).json({
      data: products,
      message: "Categories products found...!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//  reviews controller ....
export const addReviewOnProduct = async (req, res) => {
  try {
    const { reviewText, rating, productId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    if (!reviewText) {
      throw new Error("Please Provide Review Too...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    product.reviews.push({
      reviewText: reviewText,
      rating: rating,
      reviewedByUserId: user._id,
      reviewedByProfilePic: user.profilePic,
      reviewedByUserName: user.name,
    });

    await product.save();

    res.status(200).json({
      data: product,
      message: "Review added successfully....!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const editReview = async (req, res) => {
  try {
    const { reviewText, rating, productId, reviewId } = req.body;
    const userId = req.user._id;

    if ((!productId, reviewId === undefined)) {
      throw new Error("Please Provide Proper Details....!");
    }

    if (!userId) {
      throw new Error("You have to Login/Signup first...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    // reviewId is within the array bounds
    if (reviewId < 0 || reviewId >= product.reviews.length) {
      throw new Error("Review not found....!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    if (review.reviewedBy.userId.toString() !== userId.toString()) {
      throw new Error("You are not authorized to edit this review.");
    }

    review.reviewText = reviewText;
    review.rating = rating;

    await product.save();

    res.status(200).json({
      message: "Review edited successfully!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// delete your own review
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    const userId = req.user._id;

    if (!productId || reviewId === undefined) {
      throw new Error("Please provide the product ID and review ID.");
    }

    if (!userId) {
      throw new Error("You need to Login/Signup first.");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    // reviewId is within the array bounds
    if (reviewId < 0 || reviewId >= product.reviews.length) {
      throw new Error("Review not found.");
    }

    const review = product.reviews[reviewId];
    if (review.reviewedByUserId.toString() !== userId.toString()) {
      throw new Error("You are not authorized to delete this review.");
    }

    product.reviews.splice(reviewId, 1);

    await product.save();

    res.status(200).json({
      message: "Review deleted successfully!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong.",
      error: true,
      success: false,
    });
  }
};

export const likedReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    review.likedBy.push(user?._id);
    review.likeReview += 1;

    await product.save();

    res.status(200).json({
      message: "Review liked!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeLikedReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    // Check if the user has disliked the review
    if (review.likeReview > 0 && review.likedBy.includes(user._id)) {
      // Filter out the user ID from the dislikedBy array
      review.likedBy = review.likedBy.filter(
        (userID) => userID.toString() !== user._id.toString()
      );
      review.likeReview -= 1; // Decrease the dislike count
    }

    await product.save();

    res.status(200).json({
      message: "Removed review liked!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const dislikedReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    review.dislikedBy.push(user._id);
    review.dislikeReview += 1;

    await product.save();

    res.status(200).json({
      message: "Review disliked!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeDislikedReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    // Check if the user has disliked the review
    if (review.dislikeReview > 0 && review.dislikedBy.includes(user._id)) {
      // Filter out the user ID from the dislikedBy array
      review.dislikedBy = review.dislikedBy.filter(
        (userID) => userID.toString() !== user._id.toString()
      );
      review.dislikeReview -= 1; // Decrease the dislike count
    }

    await product.save();

    res.status(200).json({
      message: "Removed review disliked!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const commentOnReview = async (req, res) => {
  try {
    const { commentText, productId, reviewId } = req.body; // here review Id is index of reviewsArray review
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    if (!commentText || commentText.length === 0) {
      throw new Error("Please Provide Comment Text...!");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found...!");
    }

    // reviewId is within the array bounds
    if (reviewId < 0 || reviewId >= product.reviews.length) {
      throw new Error("Review not found....!");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    review.comments.push({
      commentText: commentText,
      commentedByUserId: user._id,
      commentedByProfilePic: user.profilePic,
      commentedByUserName: user.name,
    });

    await product.save();

    res.status(200).json({
      message: "Comment added successfully....",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { productId, reviewId, commentId, replyText } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("You have to Login/Signup first...!");
    }

    if (!replyText || replyText.length === 0) {
      throw new Error("Please provide a reply text.");
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const review = product.reviews[reviewId];

    if (!review) {
      throw new Error("Review not found....!");
    }

    const comment = review.comments[commentId];

    if (!comment) {
      throw new Error("Comment not found....!");
    }

    comment.replies.push({
      commentText: replyText,
      commentedByUserId: user._id,
      commentedByProfilePic: user.profilePic,
      commentedByUserName: user.name,
    });

    await product.save();

    res.status(200).json({
      message: "Reply addedd Successfully....!",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong.",
      error: true,
      success: false,
    });
  }
};
