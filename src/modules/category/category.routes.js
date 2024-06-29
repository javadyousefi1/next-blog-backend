const router = require("express").Router();
// controllers
const { CategoryController } = require("./category.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")

router.post("/create-category", checkIsAdmin, CategoryController.addNewCategory)
router.put("/update-category", checkIsAdmin, CategoryController.updateCategory)
router.get("/get-all-categories", checkIsAdmin, CategoryController.getAllCategorys)
router.delete("/delete-Category", checkIsAdmin, CategoryController.deleteCategory)

module.exports = {
    categoryRoutes: router
}