import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();
dotenv.config({ path: ".env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" })); // convert user requested data into json formate
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1", paymentRouter);

dbConnection();

export default app;
