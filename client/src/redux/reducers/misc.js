import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isNewGroup: false,
    isAddMember: false,
    isNotification: false,
    isMobileMenuChats: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteMenu: false,
    updloadingLoader: false,
    selectedDeleteChat: {  // changed from selectDeleteChat
        chatId: "",
        groupChat: false,
    },
};

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobileMenuChats: (state, action) => {
            state.isMobileMenuChats = action.payload;
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setUpdloadingLoader: (state, action) => {
            state.updloadingLoader = action.payload;
        },
        setSelectDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;  // changed from selectDeleteChat
        },
    },
});

export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotification,
    setIsMobileMenuChats,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteMenu,
    setUpdloadingLoader,
    setSelectDeleteChat,
} = miscSlice.actions;

export default miscSlice;
