const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const orderSchema = new mongoose.Schema(
    {
        userInfo:
        {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        orders: [
            {
                barCode: {
                    type: String,
                    required: true
                },
                Price:
                {
                    singlePrice: {
                        type: String,
                        required: true,
                    },
                    amount: {
                        type: Number,
                        default: 0
                    },
                    totalPrice: {
                        type: String,
                        required: true,
                    }
                }
            }
        ],
        description: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: null
        },
        deliveryInfo: {
            deliveryType: {
                type: String,
                required: true,
            },
            deliveryAddress:
            {
                streetAdress:
                {
                    type: String,
                    default: null
                },
                city: {
                    type: String,
                    default: null
                },
                state: {
                    type: String,
                    default: null
                },
                zipCode: {
                    type: String,
                    default: null
                },
                country: {
                    type: String,
                    default: "USA"
                }
            },

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

orderSchema.plugin(AutoIncrement, {
    inc_field: 'orderTicket',
    id: 'orderNums',
    start_seq: 500
})

module.exports = mongoose.model('Order', orderSchema)
