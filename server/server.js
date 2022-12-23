const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // prepare for mongoose update
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const xss = require('xss-clean');
// const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./routes/index');


const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, convertToApiError } = require('./middleware/apiError')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI);

// PARSING
app.use(express.json());

// SANITIZE
app.use(xss());
app.use(mongoSanitize());

// PASSPORT
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// ROUTES
app.use('/api', routes); // /api - our prefix, from which we will handle

// ERROR HANDLING
app.use(convertToApiError);
app.use((err,req,res,next)=>{
    handleError(err,res);
});


app.use(express.static('client/build')); // for deploy
if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log('Server running on port', PORT);
});
