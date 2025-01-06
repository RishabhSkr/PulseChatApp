import { Menu, Stack, Typography } from "@mui/material";
import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector((state) => state.misc);

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;


  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/chatHome");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',  // dark background
          color: '#ffffff',            // white text
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          borderRadius: '6px',  // slightly smaller radius
          border: '1px solid #333333',  // dark grey border
          minWidth: 'auto'  // prevent default minimum width
        }
      }}
    >
      <Stack
        sx={{
          width: "10rem",  // reduced from 12rem
          padding: "0.5rem 1.6rem",  // reduced padding
          cursor: "pointer",
          transition: "all 0.2s ease",
          '&:hover': {
            backgroundColor: '#2a2a2a'  // slightly lighter on hover
          },
          borderRadius: '4px',
          margin: '1px'  // reduced margin
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}  // reduced spacing
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon sx={{ color: '#ffa726', fontSize: '1.2rem' }} />  {/* orange warning color */}
            <Typography sx={{ 
              fontSize: '0.85rem',  // slightly smaller font
              fontWeight: 500,
              color: '#ffffff'  // white text
            }}>
              Leave Group
            </Typography>
          </>
        ) : (
          <>
            <DeleteIcon sx={{ color: '#f44336', fontSize: '1.2rem' }} />  {/* red error color */}
            <Typography sx={{ 
              fontSize: '0.85rem',  // slightly smaller font
              fontWeight: 500,
              color: '#ffffff'  // white text
            }}>
              Delete Chat
            </Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;