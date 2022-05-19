const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        chapter: {
            type: Schema.Types.ObjectId,
            ref: 'Chapter'
        },
        comment: { type: String, maxlength: 150, required: true },
    },
    { timestamps: true }

)

const Comment = model('Comment', commentSchema)

module.exports = Comment