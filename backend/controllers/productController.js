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
    if (!onlyAdminUploadProudct(req.user._id)) {    // Checking role Admin or Not
      throw new Error("Access Denied...!");
    }
    const { _id, ...dataToUpdate } = req.body;      // Product _id
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
