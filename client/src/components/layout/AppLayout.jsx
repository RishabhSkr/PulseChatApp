import { Link, useNavigate, useParams } from 'react-router-dom';
import ChatList from '../../specific/ChatList';
import Profile from '../../specific/Profile';
import Title from '../shared/Title';
import Header from './Header';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsDeleteMenu,
    setIsMobileMenuChats,
    setIsProfileVisible,
    setSelectDeleteChat,
} from '../../redux/reducers/misc';
import { Backdrop, Drawer, Tooltip } from '@mui/material';
import Logo from '../shared/Logo';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getSocket } from '../../socket';
import {
    NEW_MESSAGE_ALERT,
    NEW_REQUEST,
} from '../../constants/events';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    incrementNotification,
    setNewMessagesAlert,
} from '../../redux/reducers/chat';
import { getOrSaveFromStorage } from '../../lib/features';
import { ONLINE_USERS, REFETCH_CHATS } from '../../constants/events';
import DeleteChatMenu from '../../dialog/DeleteChatMenu';
import { MobileDrawerLoader } from './loaders';

const AppLayout = () => WrrapperComponent => {
    const LayoutWrapper = props => {
        const {isProfileVisible} = useSelector(state => state.misc);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const params = useParams();
        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null);
        const [onlineUsers, setOnlineUsers] = useState([]);
        const socket = getSocket();
        const { newMessagesAlert } = useSelector(state => state.chat);
        const { isLoading, data, isError, error, refetch } =
            useMyChatsQuery('');
        const { isMobileMenuChats } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);

        useErrors([{ isError, error }]);
        useEffect(() => {
            getOrSaveFromStorage({
                key: NEW_MESSAGE_ALERT,
                value: newMessagesAlert,
            });
        }, [newMessagesAlert]);

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
        };

        const handleMobileClose = () => dispatch(setIsMobileMenuChats(false));

        const newMessageAlertListener = useCallback(
            data => {
                if (data.chatId === chatId) return;
                dispatch(setNewMessagesAlert(data));
            },
            [chatId, dispatch]
        );

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate('/chatHome');
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const eventHandler = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandler);

        return (
            <div className="flex flex-col min-h-screen">
                <Title />
                <Header />
                <DeleteChatMenu
                    dispatch={dispatch}
                    deleteMenuAnchor={deleteMenuAnchor}
                />

                {isLoading ? (
                    <Backdrop open />
                ) : (
                    <Drawer
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: '70vw',
                                backgroundColor: '#1D283A',
                                color: 'white',
                            },
                        }}
                        open={isMobileMenuChats}
                        onClose={handleMobileClose}
                    >
                        <div className="p-4 border-b border-gray-700">
                        <Link to="/">
                            <Logo />
                        </Link>
                        </div>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}  // changed from onClick
                            newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}
                        />
                    </Drawer>
                    
                )}

                <div className="flex flex-grow h-[calc(100vh-4rem)] w-full overflow-hidden">
                    <div className="hidden sm:block sm:w-1/4 border-r border-gray-200 bg-gradient-to-b from-[#1D283A] to-[#0F172A]">
                        {isLoading ?  <MobileDrawerLoader/>
                         : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}  // changed from onClick
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        )}
                    </div>

                    <div className={`flex-1 bg-primary flex flex-col overflow-hidden relative`}>
                        <WrrapperComponent
                            {...props}
                            chatId={chatId}
                            user={user}
                        />
                    </div>

                    <div className={`transition-all duration-300 bg-gradient-to-b from-[#1D283A] to-[#0F172A] border-l border-gray-200 
                        ${isProfileVisible ? 'w-1/4 min-w-[250px] p-3 sm:p-4' : 'w-0 overflow-hidden'}`}>
                        <Profile user={user} />
                    </div>
                </div>
            </div>
        );
    };

    return LayoutWrapper;
};

export default AppLayout;
