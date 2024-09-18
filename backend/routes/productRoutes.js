import express from "express";
import { authToken } from "../middlewares/auth.js";
import { uploadProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);

export default router;
