const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        fType: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        barCode: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: null,
        },
        size: {
            type: String,
            default: null,
        },
        servingTime: {
            type: Number,
            default: null
        },
        fPrice: {
            type: String,
            default: "0.00"
        },
        isSpicy: {
            type: Boolean,
            default: false
        },
        isVegeterian: {
            type: Boolean,
            default: false
        },
        isVegan: {
            type: Boolean,
            default: false
        },
        fStars: {
            type: Number,
            default: 1
        },
        fPicName: {
            type: String,
            default: "#"
        },
        completed: {
            type: Boolean,
            default: false
        }



    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)
