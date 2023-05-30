class ErrorHandler extends Error {
    constructor(msg, statusCode, isOperational = true, stack = '') {
        super(msg)
        this.statusCode = statusCode
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = ErrorHandler
