import express from "express";
import {
  addToCardProduct,
  allUsers,
  deleteProductFromCart,
  getCartProduct,
  login,
  logout,
  reduceProductFromCart,
  register,
  updateUser,
  userDetails,
} from "../controllers/userController.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-details", authToken, userDetails);
router.get("/logout", authToken, logout);

// used in Admin Pannel
router.get("/all-users", authToken, allUsers);

// User Updation
router.put('/update-user', authToken, updateUser);

// product add to cart
router.post("/add-to-cart", authToken, addToCardProduct);

// delete product from cart
router.post("/delete-cart-product", authToken, deleteProductFromCart);

// reduce product quantity of cart
router.post("/reduce-cart-product", authToken, reduceProductFromCart)

// get all cart products
router.get("/get-all-cart", authToken, getCartProduct);

export default router;
