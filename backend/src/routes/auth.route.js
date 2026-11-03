import express from 'express';



const router = express.Router();



//========== Auth Routes ======================

//=== Signup ===
router.get('/signup', (req, res) => {
  res.send('Signup endpoint');
});

//=== Login ===
router.get('/login', (req, res) => {
  res.send('Login endpoint');
});

//=== Logout ===
router.get('/logout', (req, res) => {
  res.send('Logout endpoint');
});




//===========================================
export default router;