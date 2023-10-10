import nodemailer from "nodemailer"
import { config } from "dotenv"
config()
export const transport = nodemailer.createTransport({
host: process.env.host,
    port: process.env.port,
    service:"Gmail",
    auth:{
        user: process.env.user,
        pass: process.env.pass
    },
    tls:{
        rejectUnauthorized: false
    }
})

export const sendOtpEmail = async(toEmail, otp) =>{
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