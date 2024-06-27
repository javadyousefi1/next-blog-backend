const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
}, { timestamps: true, versionKey: false })

const blogModel = model("blog", blogSchema)

module.exports = { blogModel }