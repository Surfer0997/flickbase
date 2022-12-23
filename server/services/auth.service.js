// service - js which returns functions
const httpStatus = require('http-status');
const { User } = require('../models/user');
//SERVICES
const userSevice = require('../services/user.service');
// Middleware
const {ApiError} = require('../middleware/apiError')

const createUser = async (email, password) => {
  try {
    // check the emeil does not exist
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST,'Sorry, this email is already taken. But my heart is not ;)');
    }
    // hash the password (pre-save hook in user.js)
    const user = new User({
      email,
      password, // TODO
    });
    // add user to db
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = user => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    // find the user
    const user = await userSevice.findUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST,'No user with this email, but you exist and this is beautiful');
    }
    if (!(await user.comparePassword(password))) {
        throw new ApiError(httpStatus.BAD_REQUEST,'Bad password');
    }

    return user;// valid email & password => user is logged in

    
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, genAuthToken, signInWithEmailAndPassword };
