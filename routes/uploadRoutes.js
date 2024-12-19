const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')
const uploadMiddleware = require('../middleware/uploads')

// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(uploadController.getPics)
    .post(uploadMiddleware.single("ItemPics"), uploadController.createNewPics)
    .delete(uploadController.deletePics)
router.route('/:id')
    .get(uploadController.getPicsById)

module.exports = router