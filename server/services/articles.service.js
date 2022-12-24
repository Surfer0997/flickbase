const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { Article } = require('../models/article');

const addArticle = async body => {
  try {
    const article = new Article({
      ...body,
      score: parseInt(body.score), // some data can arrive as strings so we have to convert
    });
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

const getArticleById = async (id, user) => {
  try {
    const article = await Article.findById(id).populate('category');
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Article was not found');
    }

    if (user.role === 'user' && article.status === 'draft') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Sorry, you are not allowed to read my fanfics... Yet...');
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const getNoAuthUserArticleById = async id => {
  try {
    const article = await Article.findById(id).populate('category');
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Article was not found');
    }

    if (article.status === 'draft') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Sorry, you are not allowed to read my fanfics... Yet...');
    }

    return article;
  } catch (error) {
    throw error;
  }
};
const updateArticleById = async (id, body) => {
  try {
    const article = await Article.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: body, // better use express validator
      },
      {
        new: true,
      }
    );
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Article was not found');
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const deleteArticleById = async id => {
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Article was not found');
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const getAllArticles = async req => {
  const sortby = req.query.sortby || '_id'; // getting params from query string
  const order = req.query.order || 'desc';
  const limit = req.query.limit || 2;
  try {
    const articles = await Article.find({
      status: 'public', // find only public articles
    })
      .populate('category')
      .sort([[sortby, order]])
      .limit(limit);

    return articles;
  } catch (error) {
    throw error;
  }
};

const getMoreArticles = async req => {
  try {
    const sortby = req.body.sortby || '_id'; // getting params from request body
    const order = req.body.order || 'desc';
    const limit = req.body.limit || 2;
    const skip = req.body.skip || 0;

    const articles = await Article.find({
      status: 'public', // find only public articles
    })
      .populate('category')
      .sort([[sortby, order]])
      .skip(skip)
      .limit(limit);

    return articles;
  } catch (error) {
    throw error;
  }
};

const paginateAdminArticles = async req => {
  try {
    // let aggQuery = Article.aggregate();
    const aggQueryArray = [];

    if (req.body.keywords && req.body.keywords !== '') {
      const regExp = new RegExp(`${req.body.keywords}`, 'gi');
      // aggQuery = Article.aggregate([
      aggQueryArray.push({ $match: { title: { $regex: regExp } } });
      // ]);
    }
    //  else {
    //     aggQuery = Article.aggregate();
    // }

    aggQueryArray.push(
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' }
    );

    const aggQuery = Article.aggregate(aggQueryArray);
    const limit = req.body.limit ? req.body.limit : 5;
    const options = {
      page: req.body.page,
      limit,
      sort: { _id: 'desc' },
    };
    const articles = await Article.aggregatePaginate(aggQuery, options);
    return articles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addArticle,
  getArticleById,
  getNoAuthUserArticleById,
  updateArticleById,
  deleteArticleById,
  getAllArticles,
  getMoreArticles,
  paginateAdminArticles,
};
