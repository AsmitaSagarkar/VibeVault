import express from 'express';
const router = express.Router();
import { register, login, getUsers } from '../controllers/authControllers.js';

router.post('/register', register);
router.post('/login', login);   
router.get('/me', getUsers);

export default router;