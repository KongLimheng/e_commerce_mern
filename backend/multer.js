const moment = require('moment/moment')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const basePath = path.resolve(__dirname)
        cb(null, 'uploads/')
    },
    filename(req, file, callback) {
        const uniqueSuffix = `${moment.now()}-${Math.round(
            Math.random() * 1e9
        )}`

        const filename = file.originalname.split('.')
        callback(null, `${filename[0]}-${uniqueSuffix}.${filename[1]}`)
    },
})

exports.upload = multer({ storage: storage })
