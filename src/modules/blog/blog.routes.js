const { isAuthorized } = require("../../common/guards/auth.guard");
const { BlogController } = require("./blog.controller");

const router = require("express").Router();

router.post("/create-blog", BlogController.addNewBlog)
router.post("/add-comment",isAuthorized, BlogController.addComment)
router.get("/get-all-blogs", BlogController.getAllBlogs)
router.delete("/delete-blog", BlogController.deleteBlog)

module.exports = {
    blogRoutes: router
}