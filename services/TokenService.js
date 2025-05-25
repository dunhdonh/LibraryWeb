import jwt from 'jsonwebtoken';


export const generateAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '30m' } // Token sẽ hết hạn sau 30 phút
    );
}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // Token sẽ hết hạn sau 7 ngày
    );
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        return null; // Token không hợp lệ hoặc đã hết hạn
    }
}