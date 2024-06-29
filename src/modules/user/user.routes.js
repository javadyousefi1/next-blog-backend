const { UserController } = require("./user.controller");
const { checkIsAdmin } = require("../../common/guards/auth.guard")
const router = require("express").Router();

router.post("/register-user", UserController.registerUser)
router.post("/login-user", UserController.loginUser)
router.get("/get-all-users", checkIsAdmin, UserController.getAllUsers)
router.get("/get-current-user", UserController.getCurrentUser)
router.get("/logout-user", UserController.logoutUser)
router.delete("/delete-user", checkIsAdmin, UserController.deleteUser)
// router.put("/update-category", CategoryController.updateCategory)

module.exports = {
    userRoutes: router
}