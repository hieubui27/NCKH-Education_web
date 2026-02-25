import bcrypt from "bcryptjs";
import {User} from "../model/User.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/middleware.js";

export const register = asyncHandler(async (req, res) => {
    const { fullname, username, password, school, address } = req.body;
    if(!username || !password || !fullname || !school || !address){
        throw new ErrorResponse('Vui lòng cung cấp đầy đủ thông tin', 400);
    }
    const existingUser = await User.findByUsername(username);
    if(existingUser){
        throw new ErrorResponse('Tên đăng nhập đã tồn tại', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.create({ fullname, username, password: hashedPassword, school, address });
    if(users){
        res.status(201).json({ users });
    }
    else{
        throw new ErrorResponse('Không thể tạo tài khoản', 400);
    }
})

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new ErrorResponse('Điền thông tin còn thiếu', 400);
    }
    const user = await User.findByUsername(username);
    if (!user) {
        throw new ErrorResponse('Không tìm thấy tài khoản', 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ErrorResponse('Sai mật khẩu', 401);
    }
    const token = generateToken(user.id, user.role);
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ user, token });
});

export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ErrorResponse('Không tìm thấy tài khoản', 401);
    }
    res.status(200).json(
        {
            success: true,
            data: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                phonenumber: user.phonenumber,
                dob: user.dob,
                school: user.school,
                address: user.address,
                role: user.role
            }
        }
    );
})