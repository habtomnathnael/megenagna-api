const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema(
    {
        path: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    }
);
const ImageModel = mongoose.model("ItemPics", ImageSchema)

module.exports = ImageModel


