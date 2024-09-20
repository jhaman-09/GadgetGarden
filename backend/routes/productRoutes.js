import express from "express";
import { authToken } from "../middlewares/auth.js";
import {
  editProduct,
  getAllProduct,
  uploadProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);
router.get("/all-product", authToken, getAllProduct);
router.post("/update-product", authToken, editProduct);

export default router;
