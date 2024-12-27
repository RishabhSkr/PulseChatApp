import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();
router.get('/chat', isAuthenticated, (req, res) => {
    res.send('Chat route');
});

export default router;