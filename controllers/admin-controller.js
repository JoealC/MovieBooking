const Admin = require("../models/Admin")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()


const registerAdmin = async(req, res) =>{
  try{
    const{ username, password} = req.body
    const existingAdmin = await Admin.findOne({username})

    if(existingAdmin){
      return res.status(409).json({message: 'Admin Already Exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = new Admin({
      username,
      password: hashedPassword
    })

    await newAdmin.save()

    res.status(200).json({message: 'Admin registered successfully'})
  }catch(err){
    return res.status(500).json({message: "Internal Server Error"})
  }
}


const loginAdmin = async(req, res) => {
  try{
    const {username, password} = req.body

    const admin = await Admin.findOne({username})

    if(!admin){
      return res.status(401).json({message: "Authentication failed"})
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if(!passwordMatch){
      return res.status(401).json({message: "Invalid Password"})
    }

    const token = jwt.sign({username: admin.username}, process.env.SECRET_KEY, {expiresIn:'1d'})
    return res.status(200).json({token})
  }catch(err){
    return res.status(500).json({message: "Internal Server Error"})
  }
}

const getAdminProfile = async(req, res) => {
  const username = req.body
  return res.status(200).json({username})
}

module.exports = { registerAdmin, loginAdmin, getAdminProfile}