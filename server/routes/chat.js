import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { newGroupChat, 
    getMyChats ,
    getMyGroups,
    addMembers, 
    removeMember,
    leaveGroup,
    sendAttachment,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages
} from '../controllers/chat.js';
import { attachmentMulter } from '../middleware/multer.js';
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from '../lib/InputValidators.js';

const router = express.Router();
router.use(isAuthenticated);

// Add isAuthenticated middleware to protect these routes
router.post('/new', newGroupValidator,validateHandler,newGroupChat);
router.get('/my', getMyChats);
router.get('/my/groups', getMyGroups);
router.put('/addmember',addMemberValidator(),validateHandler,addMembers);
router.put('/removemember',removeMemberValidator(),validateHandler,removeMember);
router.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);
// send attachment
router.post('/message',attachmentMulter,sendAttachmentsValidator(),validateHandler,sendAttachment);
//getmessgage
router.get('/message/:id',chatIdValidator(),validateHandler,getMessages);
// get chat details ,rename ,delete 
// put this type of route end of all other routes because it will be considered as id 
router.route('/:id')
  .get(chatIdValidator(),validateHandler,getChatDetails)
  .put(renameValidator(),validateHandler,renameGroup)
  .delete(chatIdValidator(),validateHandler,deleteChat);

export default router;