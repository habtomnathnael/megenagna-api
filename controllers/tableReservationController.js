const TableReserve = require('../models/TableReserve')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all users
// @route GET /users
// @access Private
const getAllReservations = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const reserves = await TableReserve.find().lean()

    // console.log(reserves)

    // If no users 
    if (!reserves?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(reserves)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewReservation = asyncHandler(async (req, res) => {

    const { firstName, lastName, phone, email, reserveDate, partySize, reserveTime, description, completed } = req.body

    // Confirm data
    // if (!firstName || !lastName || !phone || !email || !date || !partySize || !reserveTime) {
    //     return res.status(400).json({ message: 'All fields are required' })
    // }

    // Check for duplicate username

    const tableObject = { firstName, lastName, phone, email, reserveDate, partySize, reserveTime, description, completed }


    // console.log("it is the object created")
    // console.log(tableObject)
    // console.log("it is the object created")

    // Create and store new user 
    const reserve = await TableReserve.create(tableObject)

    if (reserve) { //created 
        res.status(201).json({ message: `New table is reserved for ${firstName} ${lastName}` })

    } else {
        res.status(400).json({ message: 'invalid reservation' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateReservation = asyncHandler(async (req, res) => {

    const { id, firstName, lastName, phone, email, reserveDate, partySize, reserveTime, description, completed } = req.body

    // Confirm data
    // if (!id || !firstName || !lastName || !phone || !email || !date || !partySize || !reserveTime !== 'boolean') {
    //     return res.status(400).json({ message: 'All fields are required' })
    // }

    // Does the user exist to update?

    const reserve = await TableReserve.findById(id).exec()

    if (!reserve) {
        return res.status(400).json({ message: 'Reservation not found' })
    }

    // Check for duplicate 

    const duplicate = await TableReserve.findOne({ firstName }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Table Reservation' })
    }
    reserve.firstName = firstName
    reserve.lastName = lastName
    reserve.email = email
    reserve.reserveDate = reserveDate
    reserve.phone = phone
    reserve.partySize = partySize
    reserve.reserveTime = reserveTime
    reserve.description = description
    reserve.completed = completed
    const updatedTable = await reserve.save()
    res.json({ message: `Reservation for ${updatedTable.firstName} updated` })

})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteReservation = asyncHandler(async (req, res) => {
    const { id } = req.body
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Reservation ID Required' })
    }

    // Does the user exist to delete?
    const tableReservation = await TableReserve.findById(id).exec()

    if (!tableReservation) {
        return res.status(400).json({ message: 'Reservation not found' })
    }

    const result = await tableReservation.deleteOne()

    const reply = `Table reserved by ${result.firstName} with ID ${result._id} deleted`

    res.json(reply)
})




module.exports = {
    getAllReservations,
    createNewReservation,
    updateReservation,
    deleteReservation
}