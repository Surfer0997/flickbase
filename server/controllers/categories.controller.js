const httpStatus = require('http-status');
const { categoriesService } = require('../services');

const categoriesController = {
    async createCategory (req,res,next) {
        try {
            const category = await categoriesService.addCategory(req.body);
            res.json(category)
        } catch (error) {
            next(error);
        }
    },
    async getAllCategories (req,res,next) {
        try {
            const categories = await categoriesService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    },
}


module.exports = categoriesController;