const httpStatus = require('http-status');
const { authService, emailService } = require('../services');

const authController = {
    async register(req,res,next) {
        try {
            const {email, password} = req.body;
            const user = await authService.createUser(email, password);
            
            // token
            const token = authService.genAuthToken(user);
            // verifiaction email
            await emailService.registerEmail(email, user);
            // cookie
            res.cookie('x-access-token',token).status(httpStatus.CREATED).send({
                user,
                token
            });
        } catch (error) {
           // res.status(httpStatus.BAD_REQUEST).send(error.message);
           next(error); // forward an error to error handling middleware
        }
    },
    async signin(req,res,next) {
        try {
            const {email, password} = req.body;
           
            const user = await authService.signInWithEmailAndPassword(email, password);
            const token = await authService.genAuthToken(user);

            res.cookie('x-access-token',token).status(httpStatus.OK).send({
                user,
                token
            });
        } catch (error) {
            // res.status(httpStatus.BAD_REQUEST).send(error.message);
            next(error);
        }
    },
    async isauth(req,res,next) {
        try {
            res.json(req.user);
        } catch (error) {
            next(error);
        }
    },
     async testrole(req,res,next) {
        res.json({yes:'ok'})
     }
}

module.exports = authController;