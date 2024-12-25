import { Avatar, ListItem, Stack, Typography, IconButton } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { transformImage } from '../../lib/features';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false, sx = {} }) => {
    const { name, _id, avatar } = user;
    // console.log(user);
    return (
        <ListItem sx={{ 
            '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px'
            },
            ...sx  
        }}>
            <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2} 
                sx={{ width: '100%' }}
            >
                <Avatar src={transformImage(avatar)} />
                <Typography
                    variant="body1"
                    sx={{
                        flexGrow: 1,
                        color: "inherit",  // This was changed from 'white' to 'inherit'
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {name}
                </Typography>
                
                <IconButton
                    size="small"
                    sx={{
                        bgcolor: isAdded ? "#ec2a00" : '#3b82f6',
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "#ff5733" : "#2563eb",
                        },
                        minWidth: "32px",
                        height: "32px",
                    }}
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}
                >
                    {isAdded ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default UserItem;