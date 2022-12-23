const mongoose = require('mongoose');
const validator = require('validator');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
require('dotenv').config();

const articleSchema = mongoose.Schema({
    title: {
        type:String,
        maxLength: 100,
        required:[true, 'You need a title'],
    },
    content: {
        type:String,
        required:[true, 'You need some content'],
    },
    excerpt: {
        type:String,
        required:[true, 'Please, add the exerpt'],
        maxLength: 500
    },
    score: {
        type:Number,
        min:0,
        max:100,
        required:[true, 'If we don\'t put the score to acrticle we will live in a basement for a week']
    },
    director: {
        type: String,
        required: [true, 'Enter the director pls, be a good person']
    },
    actors: {
        type: [String],
        required: [true,''],
        validate: {
            validator: function(array) {
                return array.length >= 3
            },
            message:'You must enter at least three, so I can have my passport back'
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'public'],
        default: 'draft',
        index: true // easier for searching
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article', articleSchema);
module.exports = {Article};