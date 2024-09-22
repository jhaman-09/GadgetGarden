import express from "express";
import { authToken } from "../middlewares/auth.js";
import {
  editProduct,
  getAllProduct,
  oneProductFromEachCategory,
  uploadProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);
router.get("/all-product", authToken, getAllProduct);
router.post("/update-product", authToken, editProduct);
router.get("/category-product", oneProductFromEachCategory);

export default router;
