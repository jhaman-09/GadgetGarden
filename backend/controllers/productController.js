import { Product } from "../models/productSchema.js";
import onlyAdminUploadProduct from "../middlewares/isRoleAdmin.js";
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

    console.log("req :", req);

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

    if (!onlyAdminUploadProduct(req._id)) {
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
