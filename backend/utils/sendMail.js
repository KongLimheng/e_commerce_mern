const nodemailer = require('nodemailer')

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE || 'gmail',
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    })

    await transporter.sendMail(
        {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        },
        (err, info) => {
            if (err) {
                console.log(err, 'from sendMail')
            } else {
                console.log('Email sent: ' + info.response)
                // do something useful
            }
        }
    )
}

module.exports = sendMail
