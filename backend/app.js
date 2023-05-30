const express = require('express')
const ErrorHandler = require('./middleware/error.js')
const APIError = require('./utils/ErrorHandler.js')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const user = require('./controllers/user')
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')

const app = express()

app.use('/', express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: 'backend/config/.env',
    })
}

// import routes
app.use('/api/v2/user', user)
app.use('/api/me', (req, res, next) => {
    res.status(200).json({
        hi: 'hi',
    })
})
app.use((req, res, next) => {
    next(new APIError('Not found', StatusCodes.NOT_FOUND))
})
// for error handling
app.use(ErrorHandler)

module.exports = app
