import express from "express";
import { protect } from '../middleware/auth.middleware.js';
import { getAllContacts, getMessageByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { arcJetProtection } from "../middleware/arcjet.middleware.js";


//===========================================
const router = express.Router();

//Auth middleware
router.use(protect);

//Rate limiting and bot detection
router.use(arcJetProtection)

//============ Routes ========================

router.get('/contacts', getAllContacts);

router.get('/chats', getChatPartners);

router.get('/:id', getMessageByUserId);

router.post('/send/:id', sendMessage);



//===========================================
export default router;