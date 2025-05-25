import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from './TokenService.js';

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Lưu refresh token vào user nếu muốn quản lý đa phiên đăng nhập
    user.refreshToken = refreshToken;
    await user.save();

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role
        },
        accessToken,
        refreshToken
    };
};

const register = async (userData) => {
    const { username, email, password} = userData;

    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,  
        passwordHash
    });

    return {
        message: "User registered successfully",
        user: await newUser.save()
    };
};

const logout = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.refreshToken = null; // Xóa refresh token
    await user.save();
    return { message: 'Logged out successfully' };
}

export default {
    login,
    register, 
    logout
};