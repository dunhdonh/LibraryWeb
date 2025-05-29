import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role, username: user.username, avatar: user.avatar },
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


export const generateOtpToken = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString(); // Tạo mã OTP ngẫu nhiên 6 chữ số
    const token = jwt.sign(
        { email, otp },
        process.env.JWT_OTP_SECRET,
        { expiresIn: '5m' } // Token sẽ hết hạn sau 10 phút
    );

    return {
        otp,
        token
    };
}

export const generateResetPasswordToken = (email) => {
    const token = jwt.sign(
        { email },
        process.env.JWT_RESET_PASSWORD_SECRET,
        { expiresIn: '10m' } // Token sẽ hết hạn sau 10 phút
    );

    return token;
}

export const verifyResetPasswordToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
        return { success: true, email: payload.email };
    } catch (error) {
        return { success: false, message: 'Token không hợp lệ hoặc đã hết hạn' };
    }
}

export const verifyOtpToken = (token, otpInput) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_OTP_SECRET);
    if (payload.otp !== otpInput) {
      return { success: false, message: 'OTP không đúng' };
    }
    return { success: true, email: payload.email };
  } catch (error) {
    return { success: false, message: 'Token không hợp lệ hoặc đã hết hạn' };
  }
};


export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        return null; // Token không hợp lệ hoặc đã hết hạn
    }
}

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null; // Token không hợp lệ hoặc đã hết hạn
    }
}
