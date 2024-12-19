const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const tableReservationSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        reserveDate: {
            type: String,
            required: true,
        },
        partySize: {
            type: String,
            required: true,
        },

        reserveTime: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: null
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

tableReservationSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'reserveNums',
    start_seq: 100
})

module.exports = mongoose.model('TableReservation', tableReservationSchema)
