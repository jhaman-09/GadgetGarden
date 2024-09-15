import express from "express";
import {
  allUsers,
  login,
  logout,
  register,
  updateUser,
  userDetails,
} from "../controllers/userController.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-details", authToken, userDetails);
router.get("/logout", authToken, logout);

// used in Admin Pannel
router.get("/all-users", authToken, allUsers);

// User Updation
router.put('/update-user', authToken, updateUser);

export default router;
