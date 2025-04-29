import express from 'express';
import { sendMessage,sendMessageToUser } from '../controllers/messageController.js';


const router = express.Router();

router.post('/send', sendMessage);
router.post('/send-user', sendMessageToUser);

export default router;