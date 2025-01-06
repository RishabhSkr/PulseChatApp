import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../constants/config';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/v1/` }),
    tagTypes: ['Chat', 'User', 'Message'],
    endpoints: builder => ({
        myChats: builder.query({
            query: () => ({
                url: 'chat/my',
                credentials: 'include',
            }),
            providesTags: ['Chat'],
        }),

        searchUser: builder.query({
            query: name => ({
                url: `user/search?name=${name}`, // Fixed the query parameter format
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
        sendFriendRequest: builder.mutation({
            query: data => ({
                url: 'user/sendrequest',
                method: 'PUT',
                credentials: 'include',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),
        acceptFriendRequest: builder.mutation({
            query: data => ({
                url: 'user/acceptrequest',
                method: 'PUT',
                credentials: 'include',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Chat'],
        }),
        getNotification: builder.query({
            query: () => ({
                url: `user/notifications`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `chat/${chatId}`;
                if (populate) url += `?populate=true`;
                return {
                    url,
                    credentials: 'include',
                };
            },
            providesTags: ['Chat'],
        }),
        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        sendAttachments: builder.mutation({
            query: data => ({
                url: 'chat/message',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),

        myGroups: builder.query({
            query: () => ({
                url: `chat/my/groups`,
                credentials: 'include',
            }),
            providesTags: ['Chat'],
        }),
        availableFriends: builder.query({
            query: chatId => {
                let url = `user/friends`;
                if (chatId) url += `?chatId=${chatId}`;
                return {
                    url,
                    credentials: 'include',
                };
            },
            providesTags: ['Chat'],
        }),
        newGroup: builder.mutation({
            query: ({ name, members }) => ({
              url: "chat/new",
              method: "POST",
              credentials: "include",
              body: { name, members },
            }),
            invalidatesTags: ["Chat"],
          }),

        renameGroup: builder.mutation({
            query: ({ chatId, name }) => ({
                url: `chat/${chatId}`,
                method: 'PUT',
                credentials: 'include',
                body: { name },
            }),
            invalidatesTags: ['Chat'],
        }),

        removeGroupMember: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `chat/removemember`,
                method: 'PUT',
                credentials: 'include',
                body: { chatId, userId },
            }),
            invalidatesTags: ['Chat'],
        }),

        addGroupMembers: builder.mutation({
            query: ({ members, chatId }) => ({
                url: `chat/addmember`,
                method: 'PUT',
                credentials: 'include',
                body: { members, chatId },
            }),
            invalidatesTags: ['Chat'],
        }),

        deleteChat: builder.mutation({
            query: chatId => ({
                url: `chat/${chatId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Chat'],
        }),

        leaveGroup: builder.mutation({
            query: chatId => ({
                url: `chat/leave/${chatId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Chat'],
        }),
        // admin routes
        dahsboard: builder.query({
            query: () => ({
                url: 'admin/stats',
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        userManagement: builder.query({
            query: () => ({
                url: 'admin/users',
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        chatManagement: builder.query({
            query: () => ({
                url: 'admin/chats',
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        messageManagement: builder.query({
            query: () => ({
                url: 'admin/messages',
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),


    }),
});

export default api;
export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useDahsboardQuery,
    useUserManagementQuery,
    useChatManagementQuery,
    useMessageManagementQuery,
    
} = api;
