import AuthService from '../services/AuthService.js';

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await AuthService.login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const register = async (req, res) => {
    try {
        const newUser = await AuthService.register(req.body); // Truyền nguyên object
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    const { userId } = req.body;
    try {
        await AuthService.logout(userId);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email là bắt buộc' });

    const result = await AuthService.sendOtp(email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { token, otp } = req.body;
    if (!token || !otp) return res.status(400).json({ message: 'Token và OTP là bắt buộc' });

    const result = await AuthService.verifyOtp(token, otp);  // Chuyển token và otp
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    console.log('OTP verified successfully:', result);
    res.json({ message: 'OTP verified successfully', email: result.email, resetToken: result.resetToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const resetPassword = async (req, res) => {
     try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Token và mật khẩu mới là bắt buộc' });

    const result = await AuthService.resetPassword(token, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
    login,
    register, 
    logout, 
    forgotPassword,
    verifyOtp, 
    resetPassword
};

