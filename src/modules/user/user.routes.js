const { UserController } = require("./user.controller");

const router = require("express").Router();

router.post("/register-user", UserController.registerUser)
// router.put("/update-category", CategoryController.updateCategory)
// router.get("/get-all-categories", CategoryController.getAllCategorys)
// router.delete("/delete-Category", CategoryController.deleteCategory)

module.exports = {
    userRoutes: router
}