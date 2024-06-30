const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    categoryId: { type: String, required: true, trim: true },
    comments: { type: [Object], required: false, default: [] }
}, { timestamps: true, versionKey: false })

const blogModel = model("blog", blogSchema)

module.exports = { blogModel }