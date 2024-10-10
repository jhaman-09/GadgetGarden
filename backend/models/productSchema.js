/*
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    discount : "",
    uploadedBy : "" (objectId ref)
    reviews : []
*/

import mongoose from "mongoose";
import { reviewProductSchema } from "./reviewProductSchema";

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
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,   // Reference to the user who uploaded the product
      ref: "User",                            // Referencing the User model
      required: true,
    },
    reviews : [reviewProductSchema]
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
