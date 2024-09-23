import { Product } from "../models/productSchema.js";
import onlyAdminUploadProduct from "../middlewares/isRoleAdmin.js";
import onlyAdminUploadProudct from "../middlewares/isRoleAdmin.js";
export const uploadProduct = async (req, res) => {
  try {
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
    });

    res.status(200).json({
      success: true,
      message: "Product Uploaded Successfully",
      data: productSave,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: allProducts,
      message: "Product Found Successfully...!",
      errror: false,
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
    const { _id, ...dataToUpdate } = req.body; // Product _id
    const updatedProduct = await Product.findByIdAndUpdate(_id, dataToUpdate);

    res.status(200).json({
      message: "Product update Successfully..!",
      data: updatedProduct,
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
      message: "Prudct Found from each category..!",
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
    const category = req.body || req.query;
    const products = await Product.find(category);

    if (!products) {
      throw new Error("No Products Found..!");
    }

    res.status(200).json({
      data: products,
      message: "Products FOund Successfully..!",
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
