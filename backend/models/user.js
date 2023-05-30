const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [4, 'Password should be greater than 4 characters'],
        select: false,
    },
    phoneNumber: {
        type: Number,
    },
    addresses: [
        {
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            zipCode: {
                type: Number,
            },
            addressType: {
                type: String,
            },
        },
    ],
    role: {
        type: String,
        default: 'user',
    },
    avatar: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.method.getJwtToken = () => {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
        algorithm: 'HS256',
    })
}

userSchema.method.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
}

exports.User = mongoose.model('User', userSchema)
