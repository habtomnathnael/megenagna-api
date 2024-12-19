const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require("path")

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "./uploads");
            // cb(null, "../frontEnd/src/img");
        },
        filename: (req, file, cb) => {

            // const newStr = file.originalname.replace(/\s+/g, ""); // Replace all spaces globally
            // cb(null, Date.now() + newStr);

            cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);

        },
    }
);

const fileFilter = (req, file, cb) => {
    const allowedFilterTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (allowedFilterTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadMiddleware = multer({ storage, fileFilter })

module.exports = uploadMiddleware


// const uploads = multer({ storage })
// module.exports = uploads 
