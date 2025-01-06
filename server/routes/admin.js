import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../controllers/admin.js';
import { adminLoginValidator, validateHandler } from '../lib/InputValidators.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

// only admin can access these routes

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

router.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

router.use(adminOnly);

router.get("/", getAdminData);

router.get("/users", allUsers);
router.get("/chats", allChats);
router.get("/messages", allMessages);

router.get("/stats", getDashboardStats);

export default router;