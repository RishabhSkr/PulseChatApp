import { Stack, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'
import { dashboardData } from '../../constants/sampleData'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import moment from 'moment'
import RenderAttachment  from "../../components/shared/RenderAttachements"
import { fileFormat } from "../../lib/features"

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i,idx) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={{idx}}>
                <a
                
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
   field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    // yeh important h yhan kaise sender each row me show hoga
    renderCell: (params) => (
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center"
      >
        <AvatarCard alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groupchat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    headerClassName: "table-header",
    width: 250,
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const data = dashboardData.messages.map((message) => ({
      id: message._id,
      attachments: message.attachments, // Fix spelling here
      content: message.content || "No content",
      sender: message.sender,
      chat: message.chat,
      groupchat: message.groupChat, // Fix casing here
      createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
    }))
    setRows(data)
  }, [])

  return (
    <AdminLayout>
    <Table cols={columns} rows={rows} rowHeight={200} />
    </AdminLayout>
  )
}

export default MessageManagement