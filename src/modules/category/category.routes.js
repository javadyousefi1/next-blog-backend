const { CategoryController } = require("./category.controller");

const router = require("express").Router();

router.post("/create-category", CategoryController.addNewCategory)
router.put("/update-category", CategoryController.updateCategory)
router.get("/get-all-categories", CategoryController.getAllCategorys)
router.delete("/delete-Category", CategoryController.deleteCategory)

module.exports = {
    categoryRoutes: router
}