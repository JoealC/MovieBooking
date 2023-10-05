const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminProfile} = require("../controllers/admin-controller")
const {authenticateToken} = require("../middleware/authMiddleware")

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/profile', authenticateToken, getAdminProfile);

module.exports = router