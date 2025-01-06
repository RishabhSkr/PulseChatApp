import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/features.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Add this import
import userRouter from './routes/user.js';
import chatRouter from './routes/chat.js';
import adminRouter from './routes/admin.js';
import { createUser } from './seeder/user.js';
import { errorMiddleware } from './middleware/error.js';
import { createSingleChats, createMessagesInAChat } from './seeder/chat.js';
import { Server } from 'socket.io';
import { createServer, get } from 'http';
import {
    corsOptions,
    NEW_MESSAGE,
    NEW_MESSAGE_ALERT,
    ONLINE_USERS,
    START_TYPING,
    STOP_TYPING,
    CHAT_LEAVED,
} from './constants/constants.js';
import { v4 as uuid } from 'uuid';
import { getSockets } from './lib/helper.js';
import { Message } from './model/message.js';
import { v2 as cloudinary } from 'cloudinary';
import {socketAuth}  from './middleware/auth.js';
import { CHAT_JOINED } from '../client/src/constants/events.js';

export const userSocketIDs = new Map();
const onlineUsers = new Set();
// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
// middleware
const io = new Server(httpServer, {
    cors: corsOptions,
});
// saved the instace of io in app
app.set("io", io);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Modified socket middleware
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) => {
    return await socketAuth(socket, next, err);
  });
});

// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// using multer for avatar so no need to use urlencoded middleware

// mongoose connect with env var
connectDB(process.env.DB_URI);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Set max listeners to prevent warning
process.setMaxListeners(15);

// Seeder
// createUser(10);
// createSingleChats(10);
// createMessagesInAChat("676f33fbb9373433b15b7f5a",50);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', async (socket) => {
    const user = socket.user;
    userSocketIDs.set(user._id.toString(), socket.id);
    socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
        
        const messageForRealTime = {
            _id: uuid(),
            content: messages,
            sender: {
                _id: user._id,
                name: user.name,
            },
           chat: chatId,
            createdAt: new Date().toISOString(),
        };
        const messageForDB = {
            content: messages,
            sender: user._id,
            chat:chatId,
        };

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });
        // to shwo 2.. new messages
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
        
        try {
            const savedMessage = await Message.create(messageForDB);
        } catch (err) {
            console.error("Error saving message:", err);  // Improve error logging
        }
    });
    socket.on(START_TYPING,({chatMembers,chatId})=>{
        const membersSocket = getSockets(chatMembers);
        io.to(membersSocket).emit(START_TYPING,{chatId});   
    })
    socket.on(STOP_TYPING,({chatMembers,chatId})=>{
        const membersSocket = getSockets(chatMembers);
        io.to(membersSocket).emit(STOP_TYPING,{chatId});   
    })
    socket.on(CHAT_JOINED,({chatId,members})=>{
       onlineUsers.add(user._id.toString());
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers));
    })
    socket.on(CHAT_LEAVED,({chatId,members})=>{
        onlineUsers.delete(user._id.toString());
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers));
    })
    socket.on('disconnect', () => {
        if (user && user._id) {
            userSocketIDs.delete(user._id.toString());
            onlineUsers.delete(user._id.toString());
            socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
            // console.log('User disconnected:', {
            //     userId: user._id.toString(),
            //     name: user.name,
            //     socketId: socket.id
            // });
        }
    });
});
app.use(errorMiddleware);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
