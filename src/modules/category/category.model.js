const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: { type: String, required: true, trim: true },
    svgIcon: { type: String, required: true, trim: true },
}, { timestamps: true, versionKey: false })

const categoryModel = model("category", categorySchema)

module.exports = { categoryModel }