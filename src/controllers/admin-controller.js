import {Admin} from "../models/Admin"
import { sign } from 'jsonwebtoken'
import { successResponse, errorResponse } from "../middleware/response"
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
config()


 export const registerAdmin = async(req, res) =>{
  try{
    const{ username, password} = req.body
    const existingAdmin = await Admin.findOne({username})

    if(existingAdmin){
      errorResponse(res, 401, 'Admin Already Exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = new Admin({
      username,
      password: hashedPassword
    })

    await newAdmin.save()

    successResponse(res, 200, 'Admin registered successfully')
  }catch(err){
    errorResponse (res,500,"Internal Server Error")
  }
}


export const loginAdmin = async(req, res) => {
  try{
    const {username, password} = req.body

    const admin = await Admin.findOne({username})

    if(!admin){
      errorResponse (res, 401, "Authentication failed")
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if(!passwordMatch){
      errorResponse(res, 401, "Invalid Password")
    }

    const token = sign({username: admin.username}, process.env.SECRET_KEY, {expiresIn:'1d'})
    successResponse(res, 200, ({token}))
  }catch(err){
    errorResponse (res, 500, "Internal Server Error")
  }
}

export const getAdminProfile = async(req, res) => {
  const username = req.body
  successResponse(res, 200, ({username}))
}

