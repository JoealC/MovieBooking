const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const transport = nodemailer.createTransport({
    host: process.env.host,
    port: process.env.port,
    auth:{
        user: process.env.user,
        pass: process.env.pass
    }
})

const sendOtpEmail = async(toEmail, otp) =>{
    try{
        const mailOptions = {
            from: process.env.user,
            to: toEmail,
            subejct: "OTP Verification",
            text: `Your OTP is ${otp}`
        }

        await transport.sendMail(mailOptions)
    }catch(err){
        throw err
    }
}

module.exports = {sendOtpEmail}