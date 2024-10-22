import { Product } from "../models/productSchema.js";

export const deleteProductsByCategory = async (req, res) => {
  try {
    const { category, passkey } = req.body;

    if (!passkey) {
      throw new Error("Please Provide a valid passkey..!");
    }

    if (passkey !== process.env.PASSKEY) {
      throw new Error("Error Occurs while performing deletion..!");
    }

    const products = await Product.find({ category: category });

    if (products.length <= 0) {
      throw new Error("Products through this category not found..!");
    }
    const result = await Product.deleteMany({ category: category });
    res.status(200).json({
      message: "Products deleted Successfully....!",
      data: result,
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

// perform deletion through _id
export const deleteProductById = async (req, res) => {
  try {
    const { id, passkey } = req.body; // Get the product ID from the request parameters

    if (!passkey) {
      throw new Error("Please Provide a valid passkey..!");
    }

    if (passkey !== process.env.PASSKEY) {
      throw new Error("Error Occurs while performing deletion..!");
    }
    // Find the product and delete it
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Product not found.",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      data: result,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong.",
      error: true,
      success: false,
    });
  }
};


