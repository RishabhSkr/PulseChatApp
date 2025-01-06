import { ErrorHandler } from '../utils/utility.js';
import { Chat } from '../model/chat.js';
import {
    emitEvent,
    deleteFilesFromCloudinary,
    uploadFilesTOCloudinary,
} from '../utils/features.js';
import {
    ALERT,
    REFETCH_CHATS,
    NEW_MESSAGE_ALERT,
    NEW_MESSAGE,
} from '../constants/constants.js';
import { TryCatch } from '../middleware/error.js';
import { getOtheMember } from '../lib/helper.js';
import { User } from '../model/user.js';
import mongoose from 'mongoose';
import { Message } from '../model/message.js';

const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members, `New group chat ${name} created`);

    return res.status(201).json({
        success: true,
        message: 'Group Created',
    });
});

// Get all chats that the user is a member of (group chats and private chats)
/**
 * complex query to get my chats,groups
 * Populate replaces reference IDs with actual document data from other collections.
 */
const getMyChats = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({ members: req.user }).populate(
        'members',
        'name avatar'
    );
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtheMember(members, req.user);
        // this is complex query is use to get other member with current user chat this reduce the redundancy of  making array of members in model(chat.js)
        return {
            _id,
            groupChat,
            avatar: groupChat
                ? members.slice(0, 3).map(({ avatar }) => avatar.url)
                : [otherMember?.avatar?.url],
            name: groupChat ? name : otherMember?.name,
            members: members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.user.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, []),
        };
    });
    return res.status(200).json({
        success: true,
        chats: transformedChats,
    });
});

// Get all group chats that the user created
const getMyGroups = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({
        members: req.user,
        groupChat: true,
        creator: req.user,
    }).populate('members', 'name avatar');

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    return res.status(200).json({
        success: true,
        groups,
    });
});

// add members to group chat
const addMembers = TryCatch(async (req, res, next) => {
    const { chatId, members } = req.body;
    if (!members || members.length < 1) {
        return next(new ErrorHandler('Please provide members', 400));
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
        return next(new ErrorHandler('Chat not found', 404));
    }
    if (!chat.groupChat) {
        return next(new ErrorHandler('This is not a group chat', 400));
    }
    if (chat.creator.toString() !== req.user.toString()) {
        return next(
            new ErrorHandler('You are not the creator of this chat', 400)
        );
    }

    // Make sure creator is in the members list
    const creatorId = chat.creator.toString();
    if (!chat.members.includes(creatorId)) {
        chat.members.push(chat.creator);
    }

    // Get new members
    const allNewMembersPromise = members.map(userId => User.findById(userId));
    const newMembers = await Promise.all(allNewMembersPromise);

    // Filter out members that already exist
    const uniqueMembers = newMembers
        .filter(member => member && !chat.members.includes(member._id))
        .map(member => member._id);

    chat.members.push(...uniqueMembers);

    if (chat.members.length > 100) {
        return next(new ErrorHandler('Members limit exceeded', 400));
    }

    await chat.save();

    const allUserNames = newMembers.map(({ name }) => name).join(', ');

    // Emit events
    emitEvent(
        req,
        ALERT,
        chat.members,
        `${allUserNames} are added to ${chat.name} group chat`
    );
    emitEvent(
        req,
        REFETCH_CHATS,
        chat.members,
        `New members added to ${allUserNames.name} group chat`
    );

    return res.status(200).json({
        success: true,
        message: `Members added successfully to ${chat.name}`,
        chat,
    });
});

// admin remove member from group chat
const removeMember = TryCatch(async (req, res, next) => {
    const { userId, chatId } = req.body;

    if (!userId || !chatId) {
        return next(new ErrorHandler('Please provide userId and chatId', 400));
    }

    const [chat, userToBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, 'name'),
    ]);

    if (!chat) {
        return next(new ErrorHandler('Chat not found', 404));
    }
    if (!chat.groupChat) {
        return next(new ErrorHandler('This is not a group chat', 400));
    }

    // Check if the requester is the creator
    if (chat.creator.toString() !== req.user.toString()) {
        return next(
            new ErrorHandler('Only group creator can remove members', 403)
        );
    }

    // Prevent removing the creator
    if (userId === chat.creator.toString()) {
        return next(
            new ErrorHandler(
                'Group creator cannot be removed. Use leaveGroup instead',
                400
            )
        );
    }

    if (chat.members.length <= 3) {
        return next(
            new ErrorHandler('Group must have at least 3 members', 400)
        );
    }

    // Check if user exists in the group
    if (!chat.members.some(member => member.toString() === userId)) {
        return next(
            new ErrorHandler('User is not a member of this group', 404)
        );
    }

    const allChatMembers = chat.members.map(memberId => memberId.toString());

    chat.members = chat.members.filter(
        memberId => memberId.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(req, ALERT, chat.members, {
        message: `${userToBeRemoved.name} has been removed from the group`,
        chatId,
    });

    emitEvent(req, REFETCH_CHATS, allChatMembers);

    return res.status(200).json({
        success: true,
        message: `Member removed successfully from ${chat.name}`,
        chat,
    });
});

// Leave group chat
const leaveGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    // Validate chat ID format
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return next(new ErrorHandler('Invalid chat ID format', 400));
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new ErrorHandler('Chat not found', 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler('This is not a group chat', 400));
    }

    const remainingMembers = chat.members.filter(
        member => member.toString() !== req.user.toString()
    );

    if (remainingMembers.length < 3) {
        return next(
            new ErrorHandler('Group must have at least 3 members', 400)
        );
    }

    if (chat.creator.toString() === req.user.toString()) {
        const randomIndex = Math.floor(Math.random() * remainingMembers.length);
        chat.creator = remainingMembers[randomIndex];
    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([
        User.findById(req.user, 'name'),
        chat.save(),
    ]);

    emitEvent(req, ALERT, chat.members, {
        chatId,
        message: `${user.name} has left the group`,
    });

    return res.status(200).json({
        success: true,
        message: 'You have left group successfully',
    });
});

// send attachment
const sendAttachment = TryCatch(async (req, res, next) => {
    const { chatId } = req.body;
    const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user),
    ]);

    if (!chat) {
        return next(new ErrorHandler('Chat not found', 404));
    }
    const files = req.files || ['dsdsd'];
    if (files.length < 1) {
        return next(new ErrorHandler('Please provide files', 400));
    }
    if (files.length > 5) {
        return next(
            new ErrorHandler('You can upload at most 5 files at a time', 400)
        );
    }
    // upload files to cloudinary
    const attachments = await uploadFilesTOCloudinary(files);

    const messageForDB = {
        content: '',
        attachments,
        sender: me._id,
        chat: chatId,
    };
    const messageForRealtime = {
        ...messageForDB,
        sender: {
            _id: me._id,
            name: me.name,
        },
    };
    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_MESSAGE, chat.members, {
        message: messageForRealtime,
        chatId,
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
        chatId,
    });

    return res.status(200).json({
        success: true,
        message,
    });
});

// get chat details ,rename ,delete
const getChatDetails = TryCatch(async (req, res, next) => {
    if (req.query.populate === 'true') {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId)
            .populate('members', 'name avatar')
            .lean(); // lean() is used to convert mongoose document to plain js object : isse mongoDB ke document ko modify nahi kar sakte

        if (!chat) {
            return next(new ErrorHandler('Chat not found', 404));
        }
        chat.members = chat.members.map(member => ({
            _id: member._id,
            name: member.name,
            avatar: member.avatar.url,
        }));
        return res.status(200).json({
            success: true,
            chat,
        });
    } else {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return next(new ErrorHandler('Chat not found', 404));
        }
        return res.status(200).json({
            success: true,
            chat,
        });
    }
});

const renameGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const { name } = req.body;
    if (!name) {
        return next(new ErrorHandler('Please provide new name', 400));
    }

    // Find the chat first
    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new ErrorHandler('Chat not found', 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler('This is not a group chat', 400));
    }

    if (chat.creator.toString() !== req.user.toString()) {
        return next(
            new ErrorHandler('You are not allowed to rename the group', 403)
        );
    }

    // Update the name
    chat.name = name;
    await chat.save();

    emitEvent(
        req,
        REFETCH_CHATS,
        chat.members,
        `Group chat name changed to ${name}`
    );

    return res.status(200).json({
        success: true,
        message: 'Group chat renamed successfully',
        chat,
    });
});

const deleteChat = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler('Chat not found', 404));

    const members = chat.members;

    if (chat.groupChat && chat.creator.toString() !== req.user.toString())
        return next(
            new ErrorHandler('You are not allowed to delete the group', 403)
        );

    if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
        return next(
            new ErrorHandler('You are not allowed to delete the chat', 403)
        );
    }
    // here we have to delete all the messages of the chat as well as chat
    // from cloudinary as well as from database
    const messagesWithAttachments = await Message.find({
        chat: chatId,
        attachments: { $exists: true, $ne: [] },
    });
    const publicIds = [];
    messagesWithAttachments.forEach(attachments => {
        attachments.forEach(({ public_id }) => {
            publicIds.push(public_id);
        });
    });
    await Promise.all([
        // delete files from cloudinary
        deleteFilesFromCloudinary(publicIds),
        // delete chat
        chat.deleteOne(),
        Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members, `Chat deleted by ${req.user}`);

    return res.status(200).json({
        success: true,
        message: 'Chat deleted successfully',
    });
});

// getmessgage
const getMessages = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler('Chat not found', 404));
    if (!chat.members.includes(req.user.toString())) {
        return next(new ErrorHandler('You are not a member of this chat', 403));
    }
    
    
        const [messages, totalMessagesCount] = await Promise.all([
        Message.find({ chat: chatId })
            .sort({ createdAt: -1 }) // sort in descending order
            .limit(limit)
            .skip(skip)
            .populate('sender', 'name avatar'),
        Message.countDocuments({ chat: chatId }),
    ]);
    const totalPages = Math.ceil(totalMessagesCount / limit) || 0;
    res.status(200).json({
        success: true,
        messages,
        totalPages,
        totalMessagesCount,
    });
});

export {
    newGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMember,
    leaveGroup,
    sendAttachment,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages,
};
