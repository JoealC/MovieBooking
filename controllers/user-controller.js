const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../config/jwt")
const {sendOtpEmail} = require("../service/email-service")


const registerUser = async(req, res) =>{
        const {username, email, password} = req.body
        if(!username && 
            username.trim() === "" && 
            !email && 
            email.trim() === "" && 
            !password && 
            password.trim() === ""
            ){
                return res.status(422).json({message: "Invalid Inputs"})
            }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user
        try{
            user = new User({username,email,password: hashedPassword})
            user = await user.save()
        }catch(err){
            return res.status(500).json({message: "User already exists"})
        }
        if(!user){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }
        
        return res.status(201).json({user})
}


const loginUser = async(req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({message: "Invalid credentials"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }
        const token = generateToken({id: user._id, username: user.username})
        return res.status(200).json({token})
    }catch(err){
        return res.status(500).json({message: "Internal Server Error"})   
     }
}

const sendOtpToEmail = async(req, res) => {
    try {
      const { email } = req.body
      const otp = generateOtp()
      await sendOtpEmail(email, otp)
  
      return res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

module.exports = {registerUser,loginUser, sendOtpToEmail}