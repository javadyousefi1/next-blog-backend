const Controller = require('../../common/controllers/controller')
// model
const { categoryModel } = require('./category.model')
// error handling
const createError = require("http-errors");

class CategoryController extends Controller {
    #model
    constructor() {
        super()
        this.#model = categoryModel
    }

    async addNewCategory(req, res, next) {
        try {
            // get data from body
            const { title, } = req.body;
            const newCategory = { title };
            // check dublicate
            const isAlreadyExist = await this.#model.countDocuments({ title: title.trim() })
            if (isAlreadyExist) throw new createError.BadRequest("this category already exists !")
            // insert new category to DB
            const newCategoryCreated = await this.#model.create(newCategory);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Category added successfully",
                data: newCategoryCreated
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
        if (!id) throw new createError.BadRequest("you dont sent id !")
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


module.exports = { CategoryController: new CategoryController() }