const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const {userService, authService, emailService} = require('../services')
const userController = {
    async profile(req,res,next) {
        try {
            const user = await userService.findUserById(req.user._id); // we have user in req from auth midleware
            if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

            res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },
    async updateProfile(req,res,next) {
        try {
            const user = await userService.updateUserProfile(req);
            res.json(res.locals.permission.filter(user._doc));

        } catch (error) {
            next(error);
        }
    },
    async updateEmail(req,res,next) {
        try {
            // change email
            const user = await userService.updateUserEmail(req);
            // generate NEW TOKEN because we use email in token generation
            const token = await authService.genAuthToken(user);

            
            ///// Send an email to verify
            await emailService.registerEmail(user.email, user);

            res.cookie('x-access-token', token)
            .send({
                updated: 'successfully', // sending so much just for example, in real life maybe "200 OK" is enough
                user: res.locals.permission.filter(user._doc),
                token: token
            })
        } catch (error) {
            next(error);
        }
    },
    async verifyEmail(req,res,next) {
        try {
            const token = userService.validateEmailToken(req.query.validation); // decoded token
            const user = await userService.findUserById(token.sub); // we used only id to create this token so in token.sub will be only id

            if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            if (user.verified) { // если юзер уже подтердил почту
                throw new ApiError(httpStatus.IM_A_TEAPOT, 'Account is already verified');
            }

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                email: user.email,
                verified: true
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;