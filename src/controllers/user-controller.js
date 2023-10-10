import {User} from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { generateToken } from "../config/jwt"
// import { generateOtp} from "../service/otp-service"
import { sendOtpEmail } from "../service/email-service"
import { errorResponse, successResponse } from "../middleware/response"
import { config } from 'dotenv'
config()



export const registerUser = async(req, res) =>{
        try{
        const {username, email, password} = req.body
        if(!username && 
            username.trim() === "" && 
            !email && 
            email.trim() === "" && 
            !password && 
            password.trim() === ""
            ){
                errorResponse(res, 422, "Invalid Inputs")
            }

        const savedUser = await User.findOne({email: email})
        if(savedUser){
            errorResponse(res, 400, "User already exists with this email")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        successResponse(res, 200, "User saved Successfully")
    }catch(err){
        errorResponse(res, 400, err)
    }
    }



export const loginUser = async(req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        console.log(user)
        if(!user){
            errorResponse(res,401, "Invalid credentials")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            errorResponse(res, 401, "Invalid credentials")
        }
        const token = jwt.sign(req.body, process.env.SECRET_KEY)
        successResponse(res, 200, ({token}))
        console.log(token)
    }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error")   
     }
}

// export const sendOtpToEmail = async(req, res) => {
//     try {
//         const {email} = req.body
//         const otp = generateOtp()
//         console.log(otp)
//         await sendOtpEmail(email, otp)
//         // const user = new User({
//         //     username: req.body.username,
//         //     email: req.body.email,
//         //     otp: otp,
//         // })
//         //  await user.save()
//         //  console.log(user)
//         // const inputOtp = otp
//         // console.log(inputOtp)
//         // if(validateOtp(inputOtp, otp)){
//         successResponse(res, 200, 'OTP sent to email');
//         // }else{
//         //     errorResponse(res,401, "Invalid OTP")
//         // }
//     } catch (err) {
//         console.log(err)
//         errorResponse(res, 500, 'Internal Server Error');
//     }
//   }

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

async function saveOtpToUser(email, otp) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      user.otp = otp;
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async function validateOtp(email, inputOtp) {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.otp) {
        return false; 
      }
      return inputOtp === user.otp;
    } catch (error) {
      throw error;
    }
  }

  export const sendOtpToEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const otp = generateOtp();
      console.log(otp);
  
      await sendOtpEmail(email, otp);
  
      await saveOtpToUser(email, otp);
  
      const inputOtp = req.body.otp;
      console.log(inputOtp);
  
      if (await validateOtp(email, inputOtp)) {
        successResponse(res, 200, 'OTP sent to email');
      } else {
        errorResponse(res, 401, 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      errorResponse(res, 500, 'Internal Server Error');
    }
  };