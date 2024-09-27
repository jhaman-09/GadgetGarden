import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      minLength: [3, "Name must contain atleast 3 charaters"],
      maxLength: [30, "Name cannot have more than 3p charaters"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, " Please Provide a valid email"],
    },
    phone: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },

    profilePic: String,
    role: {
      type: String,
      required: [true, "Please provide your role"],
      enum: ["GENERAL", "ADMIN"],
      default: "GENERAL",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    cart: [
      {
        product_Id: String,
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// hashed password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// compare pre store hashed password and login time enter password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
