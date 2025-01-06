import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { Avatar, Stack } from '@mui/material';
import { dashboardData } from '../../constants/sampleData';
import { transformImage } from '../../lib/features';
import AvatarCard from '../../components/shared/AvatarCard';
import { useChatManagementQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'table-header',
        width: 200,
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        headerClassName: 'table-header',
        width: 150,
        // yeh important h yhan kaise avatar each row me show hoga user ka
        renderCell: params => (
            <AvatarCard alt={params.row.name} src={params.row.avatar} />
        ),
    },

    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header',
        width: 300,
    },
    {
        field: 'groupChat',
        headerName: 'Group',
        headerClassName: 'table-header',
        width: 100,
    },
    {
        field: 'totalMembers',
        headerName: 'Total Members',
        headerClassName: 'table-header',
        width: 120,
    },
    {
        field: 'members',
        headerName: 'Members',
        headerClassName: 'table-header',
        width: 300,
        renderCell: params => (
            <AvatarCard max={100} avatar={params.row.member} />
        ),
    },
    {
        field: 'totalMessages',
        headerName: 'Total Messages',
        headerClassName: 'table-header',
        width: 120,
    },
    {
        field: 'creator',
        headerName: 'Created By',
        headerClassName: 'table-header',
        width: 250,
        renderCell: params => (
            <Stack direction="row" alignItems="center" spacing={'1rem'}>
                <Avatar
                    alt={params.row.creator.name}
                    src={params.row.creator.avatar}
                />
                <span>{params.row.creator.name}</span>
            </Stack>
        ),
    },
];

const ChatManagement = () => {
    const [rows, setRows] = useState([]);
    const { data, error, isLoading, isError } = useChatManagementQuery();
    
    useErrors([
        {
            isError: isError,
            error: error,
        },
    ]);
    useEffect(() => {
        if (data) {
            const chatsData = data?.chats?.map(chat => ({
                ...chat,
                id: chat._id,
                member: chat.members.map(member =>
                    transformImage(member.avatar, 50)
                ),
                avatar: transformImage(chat.avatar[0], 50), // yeh important h yhan kaise avatar show hoga chat ka
                creator: {
                    name: chat.groupChat ? chat.creator.name : 'None',
                    avatar: chat.groupChat
                        ? transformImage(chat.creator.avatar, 50)
                        : '',
                },
            }));
            setRows(chatsData);
        }
    }, [data]);

    return (
        <AdminLayout>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <Table heading={'All Chats'} cols={columns} rows={rows} />
            )}
        </AdminLayout>
    );
};

export default ChatManagement;
