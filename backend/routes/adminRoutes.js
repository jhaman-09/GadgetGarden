import express from "express";
import { authToken } from "../middlewares/auth.js";
import {
  deleteProductById,
  deleteProductsByCategory,
} from "../controllers/adminController.js";

const router = express.Router();

// {category : category ,
//  passkey : ...}
router.delete("/delete-by-category", authToken, deleteProductsByCategory);

// {id : _id ,
//  passkey : ...}
router.delete("/delete-by-id", authToken, deleteProductById);

export default router;
