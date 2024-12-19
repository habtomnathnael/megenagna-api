const express = require('express')
const router = express.Router()
const notesPublicController = require('../controllers/publicNoteController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(notesPublicController.getAllNotes)
module.exports = router