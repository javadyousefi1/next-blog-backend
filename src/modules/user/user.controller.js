const Controller = require('../../common/controllers/controller')
// model
const { userModel } = require('./user.model')
// error handling
const createError = require("http-errors");
// jwt
const { JwtController } = require("../jwt/jwt.controller");
// constants
const NodeEnv = require('../../common/constants/env.enum');
const CookieEnv = require('../../common/constants/cookies.enum');
// jwt
const jwt = require("jsonwebtoken");

class UserController extends Controller {
    #model
    constructor() {
        super()
        this.#model = userModel
    }

    async registerUser(req, res, next) {
        try {
            // get data from body
            const { name, email, password } = req.body;
            const newUser = { name, email, password };
            // check dublicate
            const isAlreadyExist = await this.#model.countDocuments({ email: email.trim() })
            if (isAlreadyExist) throw new createError.BadRequest("this user with this email already exists !")
            // insert new category to DB
            const newUserCreated = await this.#model.create(newUser);
            // set token on cookie
            const token = await JwtController.generateNewToken(email, next);
            // set token on cookie
            res.cookie('blog_jwt', token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === NodeEnv.Production });
            // response
            res.status(200).json({
                statusCode: res.statusCode,
                message: "you registered succsefully",
                data: newUserCreated
            })
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req, res, next) {
        try {
            // get data from body
            const { email, password } = req.body;
            const loginUser = { email, password };
            // check dublicate
            const userData = await this.#model.findOne({ email: email.trim(), password: password.trim() })
            if (!userData) throw new createError.BadRequest("email or password is not correct")
            // set token on cookie
            const token = await JwtController.generateNewToken(email, next);
            // set token on cookie
            res.cookie('blog_jwt', token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === NodeEnv.Production });
            // response
            res.status(200).json({
                statusCode: res.statusCode,
                message: "you logged in succsefully",
                data: userData
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.#model.find({});
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all users gets successfully",
                data: users
            })
        } catch (error) {
            next(error)
        }
    }

    async getCurrentUser(req, res, next) {
        try {
            // get user token
            const token = req?.cookies?.blog_jwt
            // reject if token is not available
            if (!token) throw new createError.Unauthorized("user not logged in")
            const tokenData = await jwt.verify(token, process.env.JWT_SECRET)
            // check email is in user model or not
            if ("email" in tokenData) {
                const userData = await userModel.findOne({ email: tokenData.email }, { createdAt: 0, updatedAt: 0, _id: 0, password: 0 }).lean()
                return res.status(200).json({
                    statusCode: res.statusCode,
                    message: "user data gets successfully",
                    data: userData
                })
            }
            throw new createError.Unauthorized("user token is not verify")
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.query;
        if (!id) throw new createError.BadRequest("you dont sent user id !")
        try {
            const user = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "user deleted successfully",
                data: user._id
            })
        } catch (error) {
            next(error)
        }
    }

    async logoutUser(req, res, next) {
        try {
            res.clearCookie(CookieEnv.BLOG_JWT).status(200).json({
                statusCode: res.statusCode,
                message: "user logout successfully"
            })
        } catch (error) {
            next(error)
        }

    }

}


module.exports = { UserController: new UserController() }