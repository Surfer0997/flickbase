const passport = require('passport');
const {ApiError} = require('./apiError');
const httpStatus = require('http-status');
const roles = require('../config/roles');

const verify = (req,res,resolve,reject, rights) => async (err,user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED,'Authorize to see me naked'));
    }
    req.user = user; // optional. To have an access to user in authController.isauth

    //// Roles access control check
    if (rights.length) {
        const action = rights[0];
        const resource = rights[1];
        const permission = roles.can(req.user.role)[action](resource);
        
        if (!permission.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN,'These days lizards have so few rights'));
        }
        res.locals.permission = permission; // FOR FUTURE
    }


    resolve();
}

const auth = (...rigths) => async (req, res, next) => {
    
    return new Promise((resolve,reject)=>{
        passport.authenticate('jwt',{ session: false}, verify(req,res,resolve,reject, rigths))(req,res,next);
    })
    .then(()=>next())
    .catch((e)=>next(e));
}

module.exports = auth;