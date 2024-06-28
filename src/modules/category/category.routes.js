const { CategoryController } = require("./category.controller");

const router = require("express").Router();

router.post("/create-category", CategoryController.addNewCategory)
router.get("/get-all-categoeries", CategoryController.getAllCategorys)
router.delete("/delete-Category", CategoryController.deleteCategory)

module.exports = {
    categoryRoutes: router
}