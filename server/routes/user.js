import express from 'express';
import {
    userLogin,
    userSignup,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends,
} from '../controllers/user.js';
import { singlAvatar } from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/auth.js';
import {
    acceptRequestValidator,
    loginValidator,
    registerValidator,
    sendRequestValidator,
    validateHandler,
} from '../lib/InputValidators.js';

const router = express.Router();

router.post('/login', loginValidator(), validateHandler, userLogin);
router.post(
    '/signup',
    singlAvatar,
    registerValidator(),
    validateHandler,
    userSignup
);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', logout);
router.get('/search', isAuthenticated, searchUser);
router.put(
    '/sendrequest',
    isAuthenticated,
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
);
router.put(
    '/acceptrequest',isAuthenticated,
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
);

router.get('/notifications', isAuthenticated,getMyNotifications);

router.get('/friends',isAuthenticated,getMyFriends);

export default router;
