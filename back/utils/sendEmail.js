const nodemailer = require("nodemailer")

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "rubencho221@hotmail.com",
          pass: "yfxueeqqleuodbgw"
        }
    });
    const mensaje = {
        from: "Yoga Shop Store <rubencho221@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }
    await transport.sendMail(mensaje)
}

module.exports = sendEmail;