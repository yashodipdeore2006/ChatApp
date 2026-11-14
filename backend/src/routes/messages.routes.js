import express from "express";
import { protect } from '../middleware/auth.middleware.js';
import { getAllContacts, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";


//===========================================
const router = express.Router();


//============ Routes ========================

router.get('/contacts', protect, getAllContacts);

// router.get('/chats', getChatPartners);

router.get('/:id', protect, getMessageByUserId);

router.post('/send/:id', protect, sendMessage);



//===========================================
export default router;