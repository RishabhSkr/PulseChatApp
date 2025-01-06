import { IconButton, Stack } from '@mui/material';
import AppLayout from '../components/layout/AppLayout';
import {
    AttachFile as AttachFileIcon,
    Send as SendIcon,
} from '@mui/icons-material';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { InputBox } from '../components/styles/StyledComponent';
import FileMenu from '../dialog/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/loaders';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { messageBgPattern } from '../constants/color';

const Chat = ({ chatId, user }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const bottomRef = useRef(null);
    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
    const [IamTyping, setIamTyping] = useState(false);
    const [usersTyping, setUsersTyping] = useState(false) ;
    const typingTimeout = useRef(null);
   
    const chatMembers = chatDetails?.data?.chat?.members;
    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
    ];
    const socket = getSocket();

    // Scroll to bottom effect
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Infinite Scroll effect
    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
        containerRef,
        oldMessagesChunk.data?.totalPages,
        page,
        setPage,
        oldMessagesChunk.data?.messages
    );
    // Cleanup effect
    useEffect(() => {
        socket.emit(CHAT_JOINED,user._id);
        dispatch(removeNewMessagesAlert(chatId));
        return () => {
            setMessages([]);
            setMessage('');
            setOldMessages([]);
            setPage(1);
            socket.emit(CHAT_LEAVED, user._id);
        };
    }, [chatId, dispatch]);

    useEffect(() => {
        if(chatDetails.isError) return navigate('/chatHome');
    }, [chatDetails.data,navigate]);

    const newMessageListener = useCallback(
        data => {
            if (data.chatId !== chatId) return;
            setMessages(prev => [...prev, data.message]);
        },
        [chatId]
    );
    const startTypingListener = useCallback(
        data => {
            if (data.chatId !== chatId) return;
            setUsersTyping(true);
        },
        [chatId]
    );
    const stopTypingListener = useCallback(
        data => {
            if (data.chatId !== chatId) return;
            setUsersTyping(false);
        },
        [chatId]
    );
   

    const handleSubmit = e => {
        e.preventDefault();
        if (!message.trim()) return;
        socket.emit(NEW_MESSAGE, {
            chatId,
            members: chatMembers,
            messages: message,
        });
        setMessage('');
    };
    const messageOnChange = e => {
        setMessage(e.target.value);
        if(!IamTyping) {
            socket.emit(START_TYPING, { chatMembers, chatId });
            setIamTyping(true);
        }
        if(typingTimeout.current) clearTimeout(typingTimeout.current);
        // setTimeout return and saving the id of the timout to the ref to stop the changing of the state
        typingTimeout.current = setTimeout(() => { 
            socket.emit(STOP_TYPING, { chatMembers, chatId });
            setIamTyping(false);
        }, 2000);
    };
    const handleFileOpen = e => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    };
    const alertListener = useCallback(
        (data) => {
          if (data.chatId !== chatId) return;
          const messageForAlert = {
            content: data.message,
            sender: {
              _id: "djasdhajksdhasdsadasdas",
              name: "Admin",
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
          };
    
          setMessages((prev) => [...prev, messageForAlert]);
        },
        [chatId]
    );
    const eventHandlers = {
        [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessageListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
    };
    useSocketEvents(socket, eventHandlers);
    useErrors(errors);

    // Memoize sorted messages
    const allMessages = useMemo(() => {
        return [...oldMessages, ...messages].sort((a, b) => {
            // Cache Date objects
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
        });
    }, [oldMessages, messages]);

    return chatDetails.isLoading ? (
        <div>Loading...</div>
    ) : (
        <div className="flex flex-col h-full">
            {/* Messages Container */}
            <Stack
                ref={containerRef}
                boxSizing={'border-box'}
                padding={'1rem'}
                spacing={'1rem'}
                bgcolor={'#1a1a1a'}
                flex={1}
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    backgroundImage: `url("${messageBgPattern}")`,
                    backgroundPosition: 'center',
                    backgroundSize: '400px 400px',
                    backgroundRepeat: 'repeat',
                }}
            >
                {/* Messages  */}
                {allMessages.map(message => (
                    <MessageComponent
                        key={message._id}
                        message={message}
                        user={user}
                    />
                ))}
                <div className="w-full">
                    {usersTyping && <TypingLoader />}
                </div>
                <div ref={bottomRef} />

            </Stack>

            {/* Input Container */}
            <form onSubmit={handleSubmit}>
                <Stack
                    direction="row"
                    alignItems="center"
                    padding={'1rem'}
                    bgcolor={'#262626'}
                    position="relative"
                >
                    <IconButton
                        sx={{
                            color: 'white',
                            position: 'relative',
                            rotate: '30deg',
                        }}
                        onClick={handleFileOpen}
                    >
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox
                        placeholder="Type Message Here..."
                        value={message}
                        onChange={messageOnChange}
                        sx={{
                            flex: 1,
                            mx: 2,
                            height: '2.2rem',
                            color: 'white',
                        }}
                    />

                    <IconButton
                        type="submit"
                        sx={{
                            rotate: '-30deg',
                            bgcolor: 'primary.main',
                            color: 'white',
                            padding: '0.5rem',
                            '&:hover': {
                                bgcolor: '#29b200',
                            },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Stack>
            </form>
            <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
        </div>
    );
};

const WrappedChat = AppLayout()(Chat);
export default WrappedChat;
