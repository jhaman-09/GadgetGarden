/*
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
*/

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    brandName: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    category: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    productImage: {
      type: [],
      required: [true, "Please provide your Product name"],
    },

    description: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    price: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    sellingPrice: {
      type: String,
      required: [true, "Please provide your Product name"],
    },
    discount: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
