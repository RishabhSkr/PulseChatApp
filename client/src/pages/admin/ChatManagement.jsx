import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Stack } from '@mui/material'
import {dashboardData} from '../../constants/sampleData'
import {transformImage}  from  "../../lib/features"
import AvatarCard from "../../components/shared/AvatarCard"
      

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    // yeh important h yhan kaise avatar each row me show hoga user ka
    renderCell: (params) => (
      <AvatarCard alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 300,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.member} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 120,
    renderCell: (params) => (
      <Stack>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },  
  
];



const ChatManagement = () => {
  const [rows, seRows] = useState([])

  useEffect(() => {
    const data = dashboardData.chats.map((chat) => ({
      ...chat,
      id: chat._id,
      member: chat.members.map((member) => transformImage(member.avatar, 50)),
      avatar: chat.avatar.map((a) => transformImage(a, 50)),
    }));
    seRows(data);
  }, [])

  return (
    <AdminLayout>

      <Table heading={"All Chats"} cols={columns} rows={rows} />
    </AdminLayout>
  )
}


export default ChatManagement