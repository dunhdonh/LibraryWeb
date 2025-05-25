import CategoryService from "../services/CategoryService.js";

const getAllCategories = async (req, res) => {
    try {
        const result = await CategoryService.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await CategoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await CategoryService.createCategory(name);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedCategory = await CategoryService.updateCategory(id, name);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        const status = error.message === "Invalid category ID" ? 400 :
                       error.message === "Category not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await CategoryService.deleteCategory(id);
        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        const status = error.message === "Invalid category ID" ? 400 :
                       error.message === "Category not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};