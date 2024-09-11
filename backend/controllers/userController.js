import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("Please fill the registration form properly");
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      messageg: "User already exists",
      error: true,
      success: false,
    });
  }

  const user = await User.create({
    name,
    password,
    phone,
    email,
  });

  res.status(200).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please fill login form properly");
  }

  const user = await User.findOne({ email });
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // if password match then generate token
  if (isPasswordMatch) {
    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });

    const tokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.status(200).cookie("token", token, tokenOptions).json({
      message: "User Login Successfully",
      user : user,
      token: token,
      success: true,
      error: false,
    });
  } else {
    throw new Error("Please check the password");
  }
};
