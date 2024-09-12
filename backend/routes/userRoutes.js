import express from "express";
import {
  login,
  logout,
  register,
  userDetails,
} from "../controllers/userController.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-details", authToken, userDetails);
router.get("/logout", authToken, logout);

export default router;
