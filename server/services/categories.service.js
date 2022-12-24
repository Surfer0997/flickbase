const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { Category } = require('../models/category');

const addCategory = async (body) => {
    try {
        ///// here has to be validation
        const category = new Category({
            ...body
        });
        await category.save();
        return category;
    } catch (error) {
        throw error;
    }
}

const getAllCategories = async (body) => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    addCategory,
    getAllCategories,
};
  