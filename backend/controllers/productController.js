import { Product } from "../models/productSchema.js";
import onlyAdminUploadProduct from "../middlewares/isRoleAdmin.js";
import onlyAdminUploadProudct from "../middlewares/isRoleAdmin.js";
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
      message: "Product Uploaded Successfully",
      data: productSave,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Server Error..!",
      error: true,
      success: false,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { _id } = req.user;
    const allProducts = await Product.find({ uploadedBy: _id });

    if (!allProducts) {
      throw new Error("No Products Found with user..!");
    }

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
    const { category } = req.body || req.query; // post req to send category or take from url query part

    if (!category) {
      throw new Error("Please Select a Category...!");
    }

    const products = await Product.find({ category });

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
      message: "Product Found Successfully...!",
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
      message: "Product Found Successfully..!",
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
      message: "Categories Products Data Found...!",
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
