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

export default {
    login,
    register, 
    logout
};

