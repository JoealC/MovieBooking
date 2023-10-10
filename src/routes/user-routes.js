import { Router } from "express";
import { registerUser, loginUser, sendOtpToEmail } from "../controllers/user-controller";
import { authenticateToken } from "../middleware/authMiddleware";
const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/send-otp", authenticateToken, sendOtpToEmail)

export default userRouter