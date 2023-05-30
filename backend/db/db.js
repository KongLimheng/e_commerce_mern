const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose
        .connect(process.env.DB_URL, {
            serverSelectionTimeoutMS: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(
                `mongodb connected with server: ${data.connection.host}`
            )
        })
        .catch((err) => {
            console.log('====>', err)
        })
}
module.exports = connectDB
