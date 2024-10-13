const api = "http://localhost:4000/api/v1";

export const endPoint = {
  // USER RELATED ROUTES

  register: {
    url: api + "/user/register",
    method: "POST",
  },
  login: {
    url: api + "/user/login",
    method: "POST",
  },
  userDetails: {
    url: api + "/user/user-details",
    method: "GET",
  },
  logout: {
    url: api + "/user/logout",
    method: "GET",
  },
  allUser: {
    url: api + "/user/all-users",
    method: "GET",
  },
  updateUser: {
    url: api + "/user/update-user",
    method: "PUT",
  },

  // PRODUCT RELATED ROUTES

  uploadProduct: {
    url: api + "/product/upload-product",
    method: "POST",
  },
  allProduct: {
    url: api + "/product/all-product",
    method: "GET",
  },
  editProduct: {
    url: api + "/product/update-product",
    method: "POST",
  },
  oneProductFromEachCategory: {
    url: api + "/product/category-product",
    method: "GET",
  },
  productsByCategory: {
    url: api + "/product/products-by-category",
    method: "POST",
  },
  productDetails: {
    url: api + "/product/product-details",
    method: "POST",
  },
  addToCart: {
    url: api + "/user/add-to-cart",
    method: "POST",
  },

  searchProductByQuery: {
    url: api + "/product/search",
    method: "GET",
  },

  getFilteredProductsThroughCategories: {
    url: api + "/product/filter-categories",
    method: "POST",
  },

  // Review or Comment on review
  addReview: {
    url: api + "/product/review-product",
    method: "POST",
  },

  editReview: {
    url: api + "/product/edit-review",
    method: "PUT",
  },

  deleteReview: {
    url: api + "/product/delete-review",
    method: "DELETE",
  },

  commentOnReview: {
    url: api + "/product/comment-review",
    method: "POST",
  },

  replyComment: {
    url: api + "/product/reply-comment",
    method: "POST",
  },

  // Like or Dislike Review
  likeReview: {
    url: api + "/product/like-review",
    method: "POST",
  },

  removeLikedReview: {
    url: api + "/product/remove-liked-review",
    method: "POST",
  },

  dislikeReview: {
    url: api + "/product/dislike-review",
    method: "POST",
  },

  removeDislikedReview: {
    url: "/product/remove-disliked-review",
    method: "POSt",
  },

  // CART RELATED ROUTES

  getAllCartProduct: {
    url: api + "/user/get-all-carts-products",
    method: "GET",
  },

  // this will help to count the cart length using quantity
  getAllCartProducts_id: {
    url: api + "/user/get-all-cart-product-id",
    method: "GET",
  },

  reduceCartProduct: {
    url: api + "/user/reduce-cart-product",
    method: "POST",
  },
  deleteCartProduct: {
    url: api + "/user/delete-cart-product",
    method: "POST",
  },

  getCartQuantity: {
    url: api + "/user/get-all-carts-quantity",
    method: "GET",
  },

  // PAYMENT RELATED ROUTE
  paymentGateway: {
    url: api + "/checkout-payment",
    method: "POST",
  },
};
