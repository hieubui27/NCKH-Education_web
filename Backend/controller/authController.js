import bcrypt from "bcryptjs";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/middleware.js";

export const register = asyncHandler(async (req, res) => {
    const { fullname, email, password, school, address } = req.body;
    if(!email || !password || !fullname || !school || !address){
        throw new ErrorResponse('Vui lòng cung cấp đầy đủ thông tin', 400);
    }
    const existingUser = await User.findByEmail(email);
    if(existingUser){
        throw new ErrorResponse('Email đã tồn tại', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.create({ fullname, email, password: hashedPassword, school, address });
    if(users){
        res.status(201).json({ users });
    }
    else{
        throw new ErrorResponse('Không thể tạo tài khoản', 400);
    }
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ErrorResponse('Điền thông tin còn thiếu', 400);
    }
    const user = await User.findByEmail(email);
    if (!user) {
        throw new ErrorResponse('Không tìm thấy tài khoản', 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ErrorResponse('Sai mật khẩu', 401);
    }
    const token = generateToken(user.id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ user, token });
})