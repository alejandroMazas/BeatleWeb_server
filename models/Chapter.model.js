const { Schema, model } = require('mongoose')

const chapterSchema = new Schema(
    {
        title: { type: String, required: true },
        number: { type: Number, required: true },
        synopsys: { type: String, required: true },
        cover: { type: String, required: true },
        pages: [{
            type: String, required: true
        }],
        viewers: Number
    },
    { timestamps: true }

)

const Chapter = model('Chapter', chapterSchema)

module.exports = Chapter


