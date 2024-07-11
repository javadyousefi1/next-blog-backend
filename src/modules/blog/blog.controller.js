const { default: mongoose, isValidObjectId } = require('mongoose');
// controllers
const { CategoryController } = require("../category/category.controller.js")
const Controller = require('../../common/controllers/controller')
// model
const { blogModel } = require('./blog.model')
// error handling
const createError = require("http-errors");

class BlogController extends Controller {

    #model
    #CategoryController
    constructor() {
        super()
        this.#model = blogModel
        this.#CategoryController = CategoryController
    }

    async addNewBlog(req, res, next) {
        try {
            const { title, text, categoryId, tags, readingDuration, } = req.body;
            const newBlog = { text, title, categoryId, tags, readingDuration };
            // check category id is valid or not
            await this.#CategoryController.isCategoryidAlreadyExistsById(categoryId, next)
            // prevent dublicate blogs
            const alreadyExsitWithThisTitle = await this.#model.countDocuments({ title })
            if (alreadyExsitWithThisTitle !== 0) throw new createError.BadRequest("blog already exists with this title")
            // create blog                 
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
        await this.isBLogidAlreadyExistsById(id, next)
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


    async isBLogidAlreadyExistsById(id, next = () => { }) {
        try {
            if (!isValidObjectId(id)) throw new createError.BadRequest("your id is not valid")
            const foundBlog = await this.#model.countDocuments({ _id: id })
            if (!foundBlog) throw new createError.NotFound("not found a blog with this id !")
        } catch (error) {
            next(error)
        }
    }

    // comments
    async addComment(req, res, next) {
        try {
            const { blogId, comment } = req.body
            await this.isBLogidAlreadyExistsById(blogId, next)
            const updateBlogComment = await this.#model.updateOne({ _id: blogId }, { $push: { comments: { comment: comment, _id: new mongoose.Types.ObjectId(), isChecked: false, reply: null } } })
            res.status(200).json({
                statusCode: res.statusCode,
                message: "blog added successfully !"
            })
        } catch (error) {
            next(error)
        }
    }

    async replyComment(req, res, next) {
        try {
            const { blogId, commentId, reply } = req.body
            const result = await Post.updateOne(
                { _id: blogId, 'comments._id': commentId },
                { $set: { 'comments.$.reply': reply } }
            );
            // await this.isBLogidAlreadyExistsById(blogId, next)
            // const updateBlogComment = await this.#model.updateOne({ _id: blogId }, { $push: { comments: { comment: comment, _id: new mongoose.Types.ObjectId(), isChecked: false } } })
            // res.status(200).json({
            //     statusCode: res.statusCode,
            //     message: "blog added successfully !"
            // })
        } catch (error) {
            next(error)
        }
    }



}


module.exports = { BlogController: new BlogController() }