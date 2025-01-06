import { TryCatch } from '../middleware/error.js';
import { User } from '../model/user.js';
import { Chat } from '../model/chat.js';
import { Message } from '../model/message.js';
import jwt from 'jsonwebtoken';
import { cookieOptions } from '../utils/features.js';
import { ErrorHandler } from '../utils/utility.js';

// const ADMIN_SECRET_KEY= "abcdefg";
const adminLogin = TryCatch(async (req, res,next) => {
    const { secretKey } = req.body;
    const AdminSecretKey = process.env.ADMIN_SECRET_KEY || "abcdefg";
    // console.log(secretKey,AdminSecretKey);
    const isMatch = secretKey === AdminSecretKey;
    if (!isMatch) {
        return next(new ErrorHandler('Invalid secret key', 401));
    }
    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    res.cookie('adminToken', token, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({
        status: 'success',
        message: 'Admin logged in successfully!',
    });
});

const adminLogout = TryCatch(async (req, res, next) => {
    return res
      .status(200)
      .cookie("adminToken", "", {
        ...cookieOptions,
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });
  
  const getAdminData = TryCatch(async (req, res, next) => {
    return res.status(200).json({
      admin: true,
    });
  });
  


const allUsers = TryCatch(async (req, res) => {
    const users = await User.find({});
    const trasnformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {
            const [groups, friends] = await Promise.all([
                Chat.find({ members: _id, groupChat: true }).countDocuments(),
                Chat.find({ members: _id, groupChat: false }).countDocuments(),
            ]);

            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends,
            };
        })
    );

    res.status(200).json({
        status: 'success',
        users: trasnformedUsers,
    });
});

const allChats = TryCatch(async (req, res) => {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");
  
    const transformedChats = await Promise.all(
      chats.map(async ({ members, _id, groupChat, name, creator }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });
  
        return {
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || "None",
            avatar: creator?.avatar.url || "",
          },
          totalMembers: members.length,
          totalMessages,
        };
      })
    );
  
    return res.status(200).json({
      status: "success",
      chats: transformedChats,
    });
  });

const allMessages = TryCatch(async (req, res) => {
    const messages = await Message.find({})
        .populate("sender", "name avatar")
        .populate("chat", "groupChat");
    const transformedMessages = messages.map(({ _id, content, attachments, createdAt, sender, chat }) => ({
        _id,
        attachments,
        content,
        createdAt,
        chat: chat?._id.toString() || null,
        groupChat: chat?.groupChat || false,
        sender: sender ? {
            _id: sender?._id,
            name: sender?.name,
            avatar: sender?.avatar?.url || '',
        } : null,
    }));
    return res.status(200).json({
        success: true,
        messages: transformedMessages,
    });
});

const getDashboardStats = TryCatch(async (req, res) => {
    const [totalUsers, totalChats, totalMessages,groupsCounts] = await Promise.all([
        User.countDocuments(),
        Chat.countDocuments(),
        Message.countDocuments(),
        Chat.find({groupChat:true}).countDocuments()

    ]);

    // last 7 days messages
    const today = new Date();
    const last7Days = new Date(today-7*24*60*60*1000);
    const last7DaysMessages = await 
    Message.find({createdAt:{
        $gte:last7Days,
        $lte:today
    }}).select("createdAt"); // $gte is greater than or equal to
    
    const messages = new Array(7).fill(0);
    const dayInMS = 24*60*60*1000;
    last7DaysMessages.forEach(({createdAt})=>{
        
        const index = Math.floor((today-createdAt)/dayInMS); // get the difference in days
        messages[6-index]++;

    });
    const stats = {
        totalUsers,
        totalChats,
        totalMessages,
        groupsCounts,
        messages,
    }
    res.status(200).json({
        status: 'success',
       stats,
    });
}
);



export { allUsers, allChats,allMessages,getDashboardStats,adminLogin,adminLogout,getAdminData };
