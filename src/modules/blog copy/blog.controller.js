const Controller = require('../../common/controllers/controller')
// model
const { blogModel } = require('./blog.model')
// error handling
const createError = require("http-errors");

class BlogController extends Controller {
    #model
    constructor() {
        super()
        this.#model = blogModel
    }

    async addNewBlog(req, res, next) {
        try {
            const { title, text } = req.body;
            const newBlog = { text, title };
            const newBlogCreated = await this.#model.create(newBlog);
            res.status(200).json({
                statusCode: res.statusCode,
                message: "blog added successfully",
                data: newBlogCreated
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllBlogs(req, res, next) {
        try {
            const blogs = await this.#model.find({});
            res.status(200).json({
                statusCode: res.statusCode,
                message: "all blog resived successfully",
                data: blogs
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteBlog(req, res, next) {
        const { id } = req.query;
        if (!id) next(createError.BadRequest("you dont sent id !"))
        try {
            const blogs = await this.#model.deleteOne({ _id: id });
            res.status(200).json({
                statusCode: res.statusCode,
                message: "blog deleted successfully",
                data: blogs._id
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = { BlogController: new BlogController() }