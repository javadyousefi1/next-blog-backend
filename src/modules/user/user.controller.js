const Controller = require('../../common/controllers/controller')
// model
const { userModel } = require('./user.model')
// error handling
const createError = require("http-errors");
// jwt
const { JwtController } = require("../jwt/jwt.controller");
// constants
const NodeEnv = require('../../common/constants/env.enum');

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

    async updateCategory(req, res, next) {
        try {
            // get data from body
            const { title, id } = req.body;
            const updatedCategory = { title, _id: id };
            // update category from DB
            const newCategoryCreated = await this.#model.updateOne(updatedCategory);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category updated successfully",
                data: newCategoryCreated
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategorys(req, res, next) {
        try {
            const Categorys = await this.#model.find({});
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all Category resived successfully",
                data: Categorys
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req, res, next) {
        const { id } = req.query;
        if (!id) next(createError.BadRequest("you dont sent id !"))
        try {
            const Categorys = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category deleted successfully",
                data: Categorys._id
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = { UserController: new UserController() }