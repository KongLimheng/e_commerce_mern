const app = require('./app')
const connectDB = require('./db/db')

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server for handling uncaughtException`)
})

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: 'backend/config/.env',
    })
}

// connect DB
connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`shutting down the server for ${err.message}`)

    server.close(() => {
        process.exit(1)
    })
})
