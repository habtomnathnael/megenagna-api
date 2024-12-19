const ImageModel = require('../models/Upload')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')


const getPics = asyncHandler(async (req, res) => {

    const image = await ImageModel.find().sort({ createdAt: "descending" });

    if (!image?.length) {
        return res.status(400).json({ message: 'No image found' })
    }
    res.status(200).send(image)
})


const getPicsById = asyncHandler(async (req, res) => {

    const { id } = req.params

    try {
        const image = await ImageModel.findById(id)
        if (!image) res.send({ "msg": "Image Not Found" })
        const imagePath = path.join(__dirname, "../uploads", image.filename)
        res.sendFile(imagePath)
    } catch (err) {
        res.send({ "error": "Unable to get image" })
    }
})


// const getPics = async (req, res) => {

//     const { id } = req.params

//     console.log("This is the id" + id)

//     try {
//         const image = await ImageModel.findById(id)
//         if (!image) res.send({ "msg": "Image Not Found" })
//         const imagePath = path.join(__dirname, "uploads", image.filename)

//         console.log("this is the file path" + imagePath)

//         res.sendFile(imagePath)
//     } catch (err) {
//         res.send({ "error": "Unable to get image" })
//     }
// }


const createNewPics = asyncHandler(async (req, res) => {

    try {
        const { path, filename } = req.file
        if (!req.file) {
            return res.status(500).json({ error: "No file uploaded" });
        }
        const image = await ImageModel({ path, filename })
        await image.save()
        res.status(200).send({ "msg": "Image Uploaded", image })
    }
    catch (error) {
        console.log(error)
        res.send(400).send(error)
    }
})

const deletePics = asyncHandler(async (req, res) => {
    const { itemName } = req.body
    try {

        if (!itemName) {
            return res.status(500).json({ error: "No file selected to delete" });
        }

        const pictures = await ImageModel.findOneAndDelete({ itemName }).exec()


        if (!pictures) {
            return res.status(400).json({ message: 'pictures not found' })
        }

        const pics_img = fs.unlinkSync(`./uploads/${pictures.filename}`)

        console.log(`picture deleted ${pics_img}`)

        return res.status(200).send("The selected picture deleted successfuly")

    }
    catch (error) {
        console.log(error)
    }

})

module.exports = {
    getPics,
    getPicsById,
    createNewPics,
    deletePics
}