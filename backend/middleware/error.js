const { StatusCodes } = require('http-status-codes')
const APIError = require('../utils/ErrorHandler')
const { MongooseError } = require('mongoose')

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof APIError)) {
        const statusCode =
            error.statusCode || error instanceof MongooseError
                ? StatusCodes.BAD_REQUEST
                : StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || StatusCodes[statusCode]
        error = new APIError(statusCode, message, false, err.stack)
    }
    next(error)
}

/**
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    err.message = err.message || 'Internal Server Error'

    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resources not found with this is. Invalid ${err.path}`
        err = new APIError(message, StatusCodes.BAD_REQUEST)
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`
        err = new APIError(message, StatusCodes.BAD_REQUEST)
    }

    // wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = `Your url is invalid please try again`
        err = new APIError(message, StatusCodes.BAD_REQUEST)
    }

    // jwt expired
    if (err.name === 'JsonWebTokenError') {
        const message = `Your url is expired please try again letter!`
        err = new APIError(message, StatusCodes.BAD_REQUEST)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}
