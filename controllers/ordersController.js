// const Note = require('../models/Note')
const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')

// @desc Get all orders 
// @route GET /orders
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
    // Get all orders from MongoDB
    const orders = await Order.find().lean()

    // If no orders 
    if (!orders?.length) {
        return res.status(400).json({ message: 'No item list found' })
    }
    res.json(orders)
})

// @desc Create new order
// @route POST /orders
// @access Private
const createNewOrder = asyncHandler(async (req, res) => {

    // console.log(req.body)

    const { userInfo, orders, deliveryInfo } = req.body

    // Confirm data
    if (!userInfo || !orders || !deliveryInfo) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // // Check for duplicate title
    // const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    // Create and store the new user 
    const order = await Order.create({ userInfo, orders, deliveryInfo })

    if (order) { // Created 
        return res.status(201).json({ message: 'New item created' })
    } else {
        return res.status(400).json({ message: 'Invalid item data received' })
    }

})



// @desc Update an order
// @route PATCH /orders
// @access Private
const updateOrder = asyncHandler(async (req, res) => {

    const { id, firstName, lastName, phone, email, description, status, completed } = req.body

    // Confirm data
    if (!id || !lastName || !firstName || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    // Check for duplicate title
    // const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // // Allow renaming of the original note 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    order.userInfo.phone = phone
    order.userInfo.firstName = firstName
    order.userInfo.lastName = lastName
    order.userInfo.email = email
    order.description = description
    order.status = status
    order.completed = completed
    const updatedOrder = await order.save()
    res.json(`'${updatedOrder.orders.barCode}' updated`)

})



// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.body

    // console.log(req.body)

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Order ID required' })
    }

    // Confirm note exists to delete 
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    const result = await order.deleteOne()

    const reply = `Order '${result.orders.barCode}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllOrders,
    createNewOrder,
    updateOrder,
    deleteOrder
}