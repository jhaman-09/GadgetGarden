import jwt from "jsonwebtoken"
import {User} from '../models/userSchema.js'

export const authToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "please login first...!",
            error: true,
            success : false
        })
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = await User.findById(decoded._id);
    next();
}