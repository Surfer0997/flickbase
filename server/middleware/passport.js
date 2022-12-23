const { User } = require('../models/user');
require('dotenv').config();

const { Strategy:JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwtoptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

}
const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}

// Authorization -> Bearer fdsfdsfsdffdsafasfdsadjwqekjqwidu
// getting token from FRONTEND


const jwtStrategy = new JwtStrategy(jwtoptions, jwtVerify);

module.exports = {
    jwtStrategy
}