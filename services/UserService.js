import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const getAllUsers = async () => {
    return await User.find().select('-passwordHash'); // Exclude password from the result
}

const getUserById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
    }
    return await User.findById(id).select('-passwordHash'); // Exclude password from the result
}

const createUser = async (userData) => {
    const { username, email, name, password, role } = userData;
    if (!username || !email || !password || !role) {
        throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        name: name,
        passwordHash: passwordHash,
        role: role,
    });

    return await newUser.save();
};

const updateUser = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
    }

    if (updateData.password) {
        updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password; // Remove plain password from update data
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).select('-passwordHash'); // Exclude password from the result

    if (!updatedUser) {
        throw new Error('User not found');
    }

    return updatedUser;
};

const deleteUser = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
    }

    const deletedUser = await User.findByIdAndDelete(id).select('-passwordHash'); // Exclude password from the result

    if (!deletedUser) {
        throw new Error('User not found');
    }

    return deletedUser;
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};