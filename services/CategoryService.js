import Category from '../models/Category.js';
import mongoose from 'mongoose';

const getAllCategories = async () => {
    const categories = await Category.find();
    const totalCategories = await Category.countDocuments();
    return {
        categories: categories,
        totalCategories: totalCategories
    };
}

const getCategoryById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid category ID');
    }
    return await Category.findById(id);
}

const createCategory = async (name) => {
    if (!name) {
        throw new Error('Category name is required');
    }
    const newCategory = new Category({ name });
    return await newCategory.save();
}

const updateCategory = async (id, name) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid category ID');
    }
    if (!name) {
        throw new Error('Category name is required');
    }
    return await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
}

const deleteCategory = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid category ID');
    }
    return await Category.findByIdAndDelete(id);
}

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};