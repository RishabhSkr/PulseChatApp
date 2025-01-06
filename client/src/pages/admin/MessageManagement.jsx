import { Stack, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { dashboardData } from '../../constants/sampleData';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import moment from 'moment';
import RenderAttachment from '../../components/shared/RenderAttachements';
import { fileFormat, transformImage } from '../../lib/features';
import { useMessageManagementQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';

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
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);
      
            return (
              <Box key={index}>
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
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
    renderCell: (params) => (
      params.row.chat ? <span>{params.row.chat}</span> : "NA"
    ),
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
    const [rows, setRows] = useState([]);
    const { data, isLoading, isError, error } = useMessageManagementQuery();

    useEffect(() => {
      if (data) {
        setRows(
          data.messages.map((i) => ({
            ...i,
            id: i._id,
            sender: {
              name: i.sender.name,
              avatar: transformImage(i.sender.avatar, 50),
            },
            createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          }))
        );
      }
    }, [data]);


    useErrors([
        {
            isError: isError,
            error: error,
        },
    ]);

    return (
        <AdminLayout>
        {isLoading ? <div>Loading...</div> : 
            <Table cols={columns} rows={rows} rowHeight={200} />
        }
        </AdminLayout>
    );
};

export default MessageManagement;
