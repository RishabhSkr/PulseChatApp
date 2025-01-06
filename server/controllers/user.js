import { User } from '../model/user.js';
import { Chat } from '../model/chat.js';
import {
    cookieOptions,
    emitEvent,
    sendToken,
    uploadFilesTOCloudinary,
} from '../utils/features.js';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../utils/utility.js';
import { TryCatch } from '../middleware/error.js';
import { Request } from '../model/request.js';
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/constants.js';
import { getOtheMember } from '../lib/helper.js';

// signup constroller
// create a new user and save it to the database and save in cookie
const userSignup = TryCatch(async (req, res, next) => {
    const { name, username, bio, password } = req.body;
    const file = req.file;
    if (!file) return next(new ErrorHandler('Please upload a file', 400));

    try {
        const result = await uploadFilesTOCloudinary([file]);

        if (!result || !result[0] || !result[0].url) {
            return next(new ErrorHandler('Error uploading avatar', 400));
        }

        const avatar = {
            public_id: result[0].public_id,
            url: result[0].url,
        };

        const user = await User.create({
            name,
            username,
            password,
            bio,
            avatar,
        });

        sendToken(res, user, 201, 'User created successfully!');
    } catch (error) {
        return next(new ErrorHandler(`Upload failed: ${error.message}`, 500));
    }
});

const userLogin = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user)
        return next(new ErrorHandler('Invalid username or password', 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return next(new ErrorHandler('Invalid username or password', 404));

    sendToken(
        res,
        user,
        200,
        `Welcome Back!,${user.name} logged in successfully!`
    );
});

// add auth controller to check if user is authenticated
const getMyProfile = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!user) return next(new ErrorHandler('User not found', 404));
    res.status(200).json({
        success: true,
        user,
    });
});
// logout controller
const logout = TryCatch(async (req, res, next) => {
    return res
        .status(200)
        .cookie('token', null, { ...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message: 'Logged out successfully!',
        });
});

// search controller
// important api because freinds array is not in the User schema
// serach for the chat in which we are the user
// ab usme me groupchat wale hata do
// and search kro jisme other user isse presonal with other user mil jaegi (mtlb freind mil jaega)
const searchUser = TryCatch(async (req, res, next) => {
    const { name = '' } = req.query;

    // get all my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user });

    // all users from my chats i.e. all users with whom i have chatted friends
    const allUsersFromMyChats = myChats.map(chat => chat.members).flat();

    // Add current user to the excluded users list
    const excludedUsers = [...allUsersFromMyChats, req.user];

    // finding all users except me and my friends
    const allUsersExceptMeAndMyFriends = await User.find({
        _id: { $nin: excludedUsers }, // not in my chats and not myself
        name: { $regex: name, $options: 'i' },
    });

    const users = allUsersExceptMeAndMyFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
    }));

    return res.status(200).json({
        success: true,
        users,
    });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    const request = await Request.findOne({
        $or: [
            { sender: req.user, receiver: userId },
            { sender: userId, receiver: req.user },
        ],
    });

    if (request) return next(new ErrorHandler('Request already sent', 400));

    const newRequest = await Request.create({
        sender: req.user,
        receiver: userId,
    });

    // Verify request was created
    emitEvent(req, NEW_REQUEST, [userId]);

    return res.status(200).json({
        success: true,
        message: 'Friend Request Sent',
    });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
        .populate('sender', 'name')
        .populate('receiver', 'name');

    if (!request) return next(new ErrorHandler('Request not found', 404));

    if (request.receiver._id.toString() !== req.user.toString())
        return next(
            new ErrorHandler(
                'You are not authorized to accept this request',
                401
            )
        );

    if (!accept) {
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Friend Request Rejected',
        });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: 'Friend Request Accepted',
        senderId: request.sender._id,
    });
});

const getMyNotifications = TryCatch(async (req, res) => {
    const requests = await Request.find({ receiver: req.user }).populate(
        'sender',
        'name avatar'
    );

    const allRequests = requests.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        },
    }));

    return res.status(200).json({
        success: true,
        allRequests,
    });
});

const getMyFriends = TryCatch(async (req, res) => {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
        members: req.user,
        groupChat: false,
    }).populate('members', 'name avatar');

    const friends = chats.map(({ members }) => {
        const otherUser = getOtheMember(members, req.user);

        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url,
        };
    });

    if (chatId) {
        const chat = await Chat.findById(chatId);

        const availableFriends = friends.filter(
            friend => !chat.members.includes(friend._id)
        );

        return res.status(200).json({
            success: true,
            friends: availableFriends,
        });
    } else {
        return res.status(200).json({
            success: true,
            friends,
        });
    }
});

export {
    userLogin,
    userSignup,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends,
};
