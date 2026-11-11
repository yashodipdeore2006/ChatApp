import express from 'express';

//===local modules ===
import { Login, logout, resetPassword, signup, updateProfile } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';





//========= Middlewares ==================
const router = express.Router();

//========== Auth Routes ======================

//=== Signup ===
router.post('/signup', signup);

//=== Login ===
router.post('/login', Login);

//=== Logout ===
router.post('/logout', logout);

//=== resetPassword ===
router.patch('/resetpassword', resetPassword);


//=== Update Profile ===
router.put('/update-profile', protect, updateProfile);



//===========================================
export default router;