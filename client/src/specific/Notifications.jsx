import { Avatar, Button, ListItem, Dialog, DialogTitle, Stack, Typography } from "@mui/material"
import { memo, useEffect } from "react"  // Added useEffect
import PropTypes from 'prop-types'
import { transformImage } from "../lib/features"
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from "../redux/api/api"
import { useDispatch, useSelector } from "react-redux"
import { setIsNotification } from "../redux/reducers/misc"
import {toast} from 'react-hot-toast'
import { useAsyncMutation } from "../hooks/hook"


export const Notifications = () => {
const {isLoading, data, error, isError} = useGetNotificationQuery();
const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
const dispatch = useDispatch();
const { isNotification } = useSelector((state) => state.misc);

const closeHandler = () => dispatch(setIsNotification(false));

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting Request..",{ requestId: _id, accept });
  }


  return (
    <Dialog 
      open={isNotification} onClose={closeHandler}
      PaperProps={{
        sx: {
          backgroundColor: '#1f2937',
          color: 'white',
          minWidth: { xs: '90%', sm: '400px' }
        }
      }}
    >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"24rem"}>
        <DialogTitle sx={{ color: 'white', fontSize: '1.5rem', pb: 2 }}>
          Notifications
        </DialogTitle>
        {isLoading ? (
          <Typography textAlign={"center"} sx={{ color: 'gray.400' }}>
            No Data Available
          </Typography>
        ) : data.allRequests.length > 0 ? (
          data.allRequests.map(({ sender, _id }) => (
            <NotificationItem
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
              key={_id}
            />
          ))
        ) : (
          <Typography textAlign={"center"} sx={{ color: 'gray.400' }}>
            No Notifications
          </Typography>
        )}
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem sx={{ 
      borderRadius: 1,
      mb: 1,
      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
    }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            color: 'gray.100',
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "column",
          }}
          spacing={1}
        >
          <Button 
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
              color: 'white'
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            ✓
          </Button>
          
          <Button 
            size="small"
            sx={{
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
            }}
            onClick={() => handler({ _id, accept: false })}
          >
           ❌
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});


NotificationItem.displayName = 'NotificationItem';