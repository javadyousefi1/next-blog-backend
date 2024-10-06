// multer
const multer = require('multer');
// controller
const { SliderController } = require("./slider.controller");
// router
const router = require("express").Router();
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsPath = path.join(__dirname, "../../../../sliders");
        cb(null, uploadsPath);
    },
    filename: function (req, file, cb) {
        const timeStamp = new Date().getTime()
        const name = `${timeStamp}.${file.originalname.split(".").at(-1)}`
        req.fileName = name
        cb(null, name);
    }
});

const maxSize = 1000048576;

const upload = multer({
    storage: storage, limits: {
        fileSize: maxSize
    }, fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error('فقط فایل های عکس و ویدیویی مورد تایید است'), false);
        }
    }
});


// router.post("/add-slider", SliderController.addSlider)
router.post("/add-slider", upload.single('file'), SliderController.addSlider)
router.delete("/delete-slider", SliderController.deleteSlider)
router.get("/get-all-slider", SliderController.getAllSlider)
router.patch("/toggle-slider-status", SliderController.toggleSliderStatus)

module.exports = {
    sliderRoutes: router
}