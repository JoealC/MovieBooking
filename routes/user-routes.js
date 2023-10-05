const express = require ("express");
const {registerUser,loginUser, sendOtpToEmail} = require("../controllers/user-controller")
const {authenticateToken} = require("../middleware/authMiddleware")
const userRouter = express.Router()

userRouter.post("/users/register", registerUser)
userRouter.post("/users/login", loginUser)
userRouter.post("/users/send-otp", authenticateToken, sendOtpToEmail)

module.exports=userRouter