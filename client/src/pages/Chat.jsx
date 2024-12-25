import { IconButton, Stack } from '@mui/material';
import AppLayout from '../components/layout/AppLayout'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { useState, useRef, Fragment } from 'react';
import { InputBox } from '../components/styles/StyledComponent';
import FileMenu from '../dialog/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id : "dsfdfffd",
  name: "John Doe",
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  }
  const messageOnChange = (e) => {
    setMessage(e.target.value);
  }
  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };

  return (
    <Fragment className="flex flex-col h-full">
      {/* Messages Container */}
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#1a1a1a"}
        flex={1}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* Messages  */}
        {Array.isArray(sampleMessage) && sampleMessage.map((message) => (
          <MessageComponent
            key={message._id}
            message={message}
            user={user}
          />
        ))}
      </Stack>

      {/* Input Container */}

      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          alignItems="center"
          padding={"1rem"}
          bgcolor={"#262626"}
          position="relative"
        >
          <IconButton
            sx={{
              color: 'white',
              position: "relative",
              rotate: "30deg"
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
            sx={{ flex: 1, mx: 2,
                height: "2.2rem",
                color: "white",
            }}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "primary.main",
              color: "white",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#29b200",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} />
    </Fragment>
  );
}

const WrappedChat = AppLayout()(Chat);
export default WrappedChat;