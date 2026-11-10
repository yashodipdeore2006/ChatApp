import express from 'express';

//===local modules ===
import { Login, logout, resetPassword, signup } from '../controllers/auth.controller.js';





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

//===========================================
export default router;