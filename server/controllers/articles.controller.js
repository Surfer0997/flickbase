const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { articlesService } = require('../services');

const articlesController = {
    async createArticle(req, res, next) {
        try {
            const article = await articlesService.addArticle(req.body);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async getArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.getArticleById(_id, req.user);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async getNoAuthUserArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.getNoAuthUserArticleById(_id);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async updateArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.updateArticleById(_id, req.body);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async deleteArticleByID(req, res, next) {
        try {
            const _id = req.params.id;
            await articlesService.deleteArticleById(_id);
            res.status(httpStatus.OK).json({action:'deleted'});
        } catch (error) {
            next(error);
        }
    },
    async getAllArticles(req, res, next) {
        try {
            const articles = await articlesService.getAllArticles(req);
            res.json(articles);
        } catch (error) {
            next(error);
        }
    },
    async getMoreArticles(req, res, next) {
        try {
            const articles = await articlesService.getMoreArticles(req);
            res.json(articles);
        } catch (error) {
            next(error);
        }
    },
    async adminPaginate(req, res, next) {
        try {
            const articles = await articlesService.paginateAdminArticles(req);
            res.json(articles);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = articlesController;