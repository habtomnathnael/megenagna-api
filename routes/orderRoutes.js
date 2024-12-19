const express = require('express')
const router = express.Router()
const orderController = require('../controllers/ordersController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createNewOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder)
module.exports = router