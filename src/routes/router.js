const { sliderRoutes } = require("../modules/slider/slider.routes")
const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to app :)" })
});

router.use("/slider", sliderRoutes)

module.exports = {
    allRoutes: router,
};
