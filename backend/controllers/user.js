const express = require('express')
const { upload } = require('../multer')
const { User } = require('../models/user')
const ErrorHandler = require('../utils/ErrorHandler')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')

const router = express.Router()

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const userEmail = await User.findOne({ email })
        if (userEmail) {
            const filename = req.file.filename
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err, 'file upload')
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        message: 'Error deleting file',
                    })
                } else {
                    res.json({ message: 'file deleted' })
                }
            })
            return next(
                new ErrorHandler('user already exists', StatusCodes.BAD_REQUEST)
            )
        }

        const filename = req.file.filename
        const fileUrl = path.join(filename)
        const user = {
            name,
            email,
            password,
            avatar: fileUrl,
        }

        const activateToken = createActivationToke(user)
        const activateUrl = `http://localhost:3000/activation/${activateToken}`

        await sendMail({
            email: user.email,
            subject: 'Activate your account',
            message: `Hello ${user.name}, please click on the link to activate ${activateUrl}`,
        })

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: `We have sent activation to your email ${user.email}`,
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, StatusCodes.BAD_REQUEST))
    }
})

const createActivationToke = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        algorithm: 'HS256',
        expiresIn: '7d',
    })
}

router.post(
    '/activation',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { token } = req.body
            const newUser = jwt.verify(token, process.env.ACTIVATION_SECRET)
            if (!newUser) {
                return next(
                    new ErrorHandler('Invalid token', StatusCodes.NOT_FOUND)
                )
            }

            const { name, email, password, avatar } = newUser
            let user = await User.findOne({ email })
            if (user) {
                return next(
                    new ErrorHandler(
                        'User already exists',
                        StatusCodes.BAD_REQUEST
                    )
                )
            }
            user = await User.create({
                name,
                email,
                avatar,
                password,
            })

            sendToken(user, StatusCodes.CREATED, res)
        } catch (err) {}
    })
)

router.post(
    '/login',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return next(
                    new ErrorHandler('Please provide all field'),
                    StatusCodes.BAD_REQUEST
                )
            }
            const user = await User.findOne({ email }).select('+password')
            if (!user) {
                return next(
                    new ErrorHandler(
                        "User doesn't exists!",
                        StatusCodes.NOT_FOUND
                    )
                )
            }

            const isPasswordValid = await user.comparePassword(password)

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler('Wrong Password', StatusCodes.UNAUTHORIZED)
                )
            }

            sendToken(user, StatusCodes.OK, res)
        } catch (error) {}
    })
)

module.exports = router
