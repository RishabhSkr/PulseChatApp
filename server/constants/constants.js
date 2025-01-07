export const ALERT = "ALERT";
export const REFETCH_CHATS = "REFETCH_CHATS";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";
export const NEW_REQUEST = "NEW_REQUEST";
export const START_TYPING = "START_TYPING";
export const STOP_TYPING = "STOP_TYPING";
export const CHAT_JOINED = "CHAT_JOINED";
export const CHAT_LEAVED = "CHAT_LEAVED";
export const ONLINE_USERS = "ONLINE_USERS";

export const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://pulse-chat-app.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
};

