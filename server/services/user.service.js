const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const findUserByEmail = async (email) => {
    return await User.findOne({email});
}

const findUserById = async (_id) => {
    return await User.findById(_id);
}

const updateUserProfile = async (req) => {
    try {
        const user = User.findOneAndUpdate({_id:req.user._id}, { // we can validate date one more time here (watch update article method)
            "$set": {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age
            },   
        },
        {
            new: true
        });
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found (update user)');
        }
        return user;
    } catch (error) {
        throw (error);
    }
}

const updateUserEmail = async (req) => {
    try {
        // check if new email is available
        if (await User.emailTaken(req.body.newEmail)) {
            throw new ApiError(httpStatus.CONFLICT, 'This email is already taken. But not me!');
        }
        // replace old email with new
        const user = User.findOneAndUpdate({_id:req.user._id, email: req.user.email}, { // we can validate date one more time here (watch update article method)
            "$set": {
                email: req.body.newEmail,
                verified: false
            },   
        },
        {
            new: true
        });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found (update email)');
        }

        return user;

    } catch (error) {
        throw (error);
    }
}

const validateEmailToken = (token) => {
    return jwt.verify(token, process.env.DB_SECRET);
}

const addLikedArticle = async (req) => {
    try {
        const user = User.findOneAndUpdate({_id:req.user._id}, {
            "$addToSet": {
                "likedArticles": req.body.articleId
            },   
        },
        {
            new: true
        });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found (add liked article)');
        }

        return user;

    } catch (error) {
        throw (error);
    }
}

const removeLikedArticle = async (req) => {
    try {
        const user = User.findOneAndUpdate({_id:req.user._id}, {
            "$set": {
                "likedArticles": req.body.articles // we just replace array with filtered array :)))
            },   
        },
        {
            new: true
        });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found (add liked article)');
        }

        return user;

    } catch (error) {
        throw (error);
    }
}


module.exports = {findUserByEmail, findUserById, updateUserProfile, updateUserEmail, validateEmailToken, addLikedArticle, removeLikedArticle}