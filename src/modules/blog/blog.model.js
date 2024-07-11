const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    categoryId: { type: String, required: true, trim: true },
    readingDuration: { type: Number, required: true, trim: true },
    tags: { type: [String], required: true, trim: true },
    likes: { type: [String], required: false, trim: true, default: [] },
    comments: [{
        comment: String,
        _id: Schema.Types.ObjectId,
        isChecked: Boolean,
        reply: String // Add this line to define the reply field in your schema
    }]
}, { timestamps: true, versionKey: false })

const blogModel = model("blog", blogSchema)

module.exports = { blogModel }