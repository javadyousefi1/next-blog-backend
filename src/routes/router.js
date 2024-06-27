const { blogRoutes } = require("../modules/blog/blog.routes");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to Javad app :)" })
});

router.use("/blog", blogRoutes)

module.exports = {
    allRoutes: router,
};
