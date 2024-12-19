
require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

const ImageModel = require('./models/Upload')

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())


app.use('/', express.static(path.join(__dirname, 'public')))
// app.use(express.static("uploads"))
app.use(express.static("uploads"))

app.use('/admin', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/ItemImage', require('./routes/uploadRoutes'))
app.use('/reservation', require('./routes/reservationRoutes'))
app.use('/orders', require('./routes/orderRoutes'))


// ===++++++++++++++++++++++

app.use('/', require('./routes/publicNoteRoutes'))


// ____________________

// app.get("/ItemImage/:id", async (req, res) => {

//     const { id } = req.params

//     console.log(id)

//     try {
//         const image = await ImageModel.findById(id)
//         if (!image) res.send({ "msg": "Image Not Found" })
//         const imagePath = path.join(__dirname, "uploads", image.filename)
//         res.sendFile(imagePath)
//     } catch (err) {
//         res.send({ "error": "Unable to get image" })
//     }
// }
// )

//_____________________
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
