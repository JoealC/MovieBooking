import { Router } from 'express';
const adminRouter = Router();
import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/admin-controller";
import { authenticateToken } from "../middleware/authMiddleware";

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', authenticateToken, getAdminProfile);

export default adminRouter