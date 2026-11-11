import express from 'express';

//===local modules ===
import { Login, logout, resetPassword, signup, updateProfile } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { arcJetProtection } from '../middleware/arcjet.middleware.js';




//========= Middlewares ==================
const router = express.Router();

//========== Auth Routes ======================

//=== Signup ===
router.post('/signup', signup);

//=== Login ===
router.post('/login', arcJetProtection, Login);

//=== Logout ===
router.post('/logout', logout);

//=== resetPassword ===
router.patch('/resetpassword', arcJetProtection, resetPassword);


//=== Update Profile ===
router.put('/update-profile', protect, updateProfile);


//====
router.get('/check', protect, (req, res) => {
  res.status(200).json(req.user);
});


//===========================================
export default router;