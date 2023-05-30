const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename(req, file, callback) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`

        const filename = file.originalname.split('.')
        callback(null, `${filename[0]}-${uniqueSuffix}.${filename[1]}`)
    },
})

exports.upload = multer({ storage: storage })
