import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Product } from "../models/productSchema.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, profilePic, role } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please fill the registration form properly");
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        messageg: "User already exists",
        error: true,
        success: false,
      });
    }

    const user = await User.create({
      name,
      password,
      phone,
      email,
      profilePic,
      role,
    });

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill login form properly");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Email or Password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if password match then generate token
    if (isPasswordMatch) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY || "8h", // 8 hours
      });

      const tokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", token, tokenOptions).status(200).json({
        message: "Login Successfully",
        user: user,
        token: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      message: "User Logout Successfully...!",
      error: false,
      user: [],
    });
  } catch (err) {
    res.status(401).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "Login User Not found. Please Login Again...!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Found User Details Successfully...!",
      success: true,
      error: false,
      user: user,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const alluser = await User.find();
    res.status(200).json({
      alluser,
      message: "all user found",
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

export const updateUser = async (req, res) => {
  try {
    const { _id, name, email, role } = req.body;
    const sessionUser = req._id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("User with this Id not found");
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updatedUser = await User.findByIdAndUpdate(_id, payload, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });

    if (!updatedUser) {
      throw new Error("User not Found !");
    }

    res.status(200).json({
      data: updatedUser,
      message: "User Updated Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const addToCardProduct = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Sir, Login First..!");
    }

    const { productId } = req.body;
    if (!productId) {
      throw new Error(
        "Please Sir, Provide a valid Product ID as a string to Add in Cart...!"
      );
    }

    // Find if product already exists in user's cart
    const productInCart = user.cart.find(
      (item) => item.product_Id === productId
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      user.cart.push({ product_Id: productId, quantity: 1 });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart successfully!",
      cart: user.cart,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const reduceProductFromCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Sir, Login First..!");
    }

    const { productId } = req.body;
    if (!productId) {
      throw new Error(
        "Please Sir, Provide a valid Product ID as a string to Add in Cart...!"
      );
    }

    // Find the product in user's cart
    const productIndex = user.cart.findIndex(
      (item) => item.product_Id === productId
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart!");
    }

    const productInCart = user.cart[productIndex];

    if (productInCart.quantity > 1) {
      // Reduce the quantity by 1 if it's greater than 1
      productInCart.quantity -= 1;
    } else {
      // Remove the product from the cart if quantity is 1 or less
      user.cart.splice(productIndex, 1); // Remove product from cart
    }

    // Save updated user with the modified cart
    await user.save();

    res.status(200).json({
      message: "Product quantity reduced successfully!",
      cart: user.cart, // Returning updated cart
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Sir, Login First..!");
    }

    const { productId } = req.body;

    if (productId) {
      // Find the product in user's cart
      const productIndex = user.cart.findIndex(
        (item) => item.product_Id === productId
      );

      if (productIndex === -1) {
        throw new Error("Product not found in cart!");
      }

      user.cart.splice(productIndex, 1); // Remove product from cart
    } else {
      user.cart.splice(0, user.cart.length);
    }

    // Save updated user with the modified cart
    await user.save();

    res.status(200).json({
      message: "Product Deleted From Cart successfully!",
      cart: user.cart, // Returning updated cart
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartProduct_Id = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Sir, Login First..!");
    }

    res.status(200).json({
      message: "found successfully..!",
      data: user.cart,
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


export const getCartProduct = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Sir, Login First..!");
    }

    const cartProducts = []
    for (let cart of user.cart) {
      const temp = await Product.findOne(cart.productId);
      cartProducts.push(temp)
    }

    res.status(200).json({
      message: "found successfully..!",
      data: cartProducts,
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
