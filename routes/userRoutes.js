import express from 'express';
import { addUsers, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/upload', addUsers);
router.get('/', getUsers);

export default router;