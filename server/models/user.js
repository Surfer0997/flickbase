const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid, but nothing in this world is perfect,  ;)');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Bro... Just how I have to do it without password?'],
    trim: true,

  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  firstname: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  lastname: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  age: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  likedArticles: {
    type: [String], // we will store id's but not using 'em for thr reference to other collection
    default: []
  }
});
// export type User = InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
  
    next();
  });
userSchema.statics.emailTaken = async function (email) {
  // this = User model
  const user = await this.findOne({ email });
  return !!user; // !! convert to boolean
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const userObj = {sub:user._id, email: user.email};
  const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn:'1d'});
  return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) { // candidatePassword - unhashed password
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
}

userSchema.methods.generateRegisterToken = function () {
  const user = this;
  const userObj = {sub:user._id};
  const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn:'10h'});
  return token;
}


const User = mongoose.model('User', userSchema);
module.exports = {User};