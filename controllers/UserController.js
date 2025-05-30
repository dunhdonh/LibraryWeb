import UserService from '../services/UserService.js';


const getAllUsers = async (req, res) => {
    try {
        const result = await UserService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const users = await UserService.getUsersByUsername(username);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createUser = async (req, res) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await UserService.updateUser(id, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        const status = error.message === "Invalid user ID" ? 400 :
                       error.message === "User not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await UserService.deleteUser(id);
        res.status(200).json("User deleted successfully");
    } catch (error) {
        const status = error.message === "Invalid user ID" ? 400 :
                       error.message === "User not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};
