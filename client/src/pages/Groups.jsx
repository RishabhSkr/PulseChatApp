import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  DrawerSkeleton } from '../components/layout/loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponent';
import {
  bgGradient,
  cardGradient,
  darkBorder,
  darkPrimary,
  highlightGradient,
  lightBlue,
  matBlack,
} from '../constants/color';
import AddMemberDialog from '../dialog/AddMemberDialog';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMember } from '../redux/reducers/misc';
const ConfirmDeleteDialog = lazy(() => import('../dialog/confirmDeleteDialog'));

const Groups = () => {
  const dispatch = useDispatch();
    const chatId = useSearchParams()[0].get('group');
    const navigate = useNavigate();
    const myGroups = useMyGroupsQuery('');
    const groupDetails = useChatDetailsQuery({
            chatId,
            populate: true,
        },
        { skip: !chatId }
    );
    const [members, setMembers] = useState([]);
    const [updateGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
    const { isAddMember } = useSelector((state) => state.misc);
    const [removeGroupMember,isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
    const [deleteGroup,isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);
    

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

    const errors = [
        {
            isError: myGroups.isError,
            error: myGroups.error,
        },
        {
          isError: groupDetails.isError,
          error: groupDetails.error,
      },
    ];

    useErrors(errors);
    useEffect(() => {
        if (groupDetails.data) {  
            setGroupName(groupDetails.data.chat.name);
            setGroupNameUpdatedValue(groupDetails.data.chat.name);
            setMembers(groupDetails.data.chat.members);
        }
        return () => {
            setGroupName('');
            setGroupNameUpdatedValue('');
            setMembers([]);
            setIsEdit(false);
        };
    }, [groupDetails.data]);

    const navigateBack = () => {
        navigate('/chatHome');
    };

    const handleMobile = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const handleMobileClose = () => setIsMobileMenuOpen(false);

    const updateGroupName = () => {
      setIsEdit(false);
      updateGroup("Updating Group Name..",{chatId, name: groupNameUpdatedValue});
    };

    const openConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(true);
    };

    const closeConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(false);
    };

    
    const openAddMemberHandler = () => {
      dispatch(setIsAddMember(true));
    };

    const closeAddMemberHandler = () => {
        setIsAddMember(false);
    };

    const deleteHandler = () => {
      deleteGroup("Deleting Group..",chatId);
      closeConfirmDeleteHandler();
      navigate('/groups');
    };

    const removeMemberHandler = async (userId) => {
      await removeGroupMember("Removing Member..",{chatId, userId});
    };
    

    const IconBtns = (
        <>
            <Box
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none',
                        position: 'fixed',
                        right: '1rem',
                        top: '1rem',
                    },
                }}
            >
                <IconButton
                    onClick={handleMobile}
                    sx={{
                        color: lightBlue,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.5)',
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            <Tooltip title="back">
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '2rem',
                        left: '2rem',
                        bgcolor: matBlack,
                        color: 'white',
                        ':hover': {
                            bgcolor: 'rgba(0,0,0,0.7)',
                        },
                    }}
                    onClick={navigateBack}
                >
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Tooltip>
        </>
    );

    const GroupName = (
        <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            spacing={'1rem'}
            padding={'3rem'}
        >
            {isEdit ? (
                <>
                    <TextField
                        value={groupNameUpdatedValue}
                        onChange={e => setGroupNameUpdatedValue(e.target.value)}
                        sx={{
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                        }}
                    />
                    <IconButton
                        onClick={updateGroupName} disabled={isLoadingGroupName}
                        sx={{
                            color: 'white',
                            ':hover': {
                                bgcolor: 'rgba(0,0,0,0.7)',
                            },
                        }}
                    >
                        <DoneIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography variant="h5">{groupName}</Typography>
                    <IconButton
                        onClick={() => setIsEdit(true)}
                        disabled={isLoadingGroupName}
                        sx={{ color: 'white' }}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )}
        </Stack>
    );

    const ButtonGroup = (
        <Stack
            direction={{
                xs: 'column-reverse',
                sm: 'row',
            }}
            spacing={'1rem'}
            p={'1rem'}
        >
            <Button
                size="large"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={openConfirmDeleteHandler}
                sx={{
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                }}
            >
                Delete Group
            </Button>
            <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={openAddMemberHandler}
                sx={{
                    bgcolor: lightBlue,
                    '&:hover': {
                        bgcolor: darkPrimary,
                    },
                }}
            >
                Add Member
            </Button>
        </Stack>
    );

    return (
        <>
            {/* Show DrawerSkeleton when groups are loading */}
            {myGroups.isLoading ? (
                <DrawerSkeleton />
            ) : (
                <Grid
                    container
                    height={'100vh'}
                    sx={{
                        background: bgGradient,
                        color: 'white',
                    }}
                >
                    {/* Left sidebar */}
                    <Grid
                        item
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            borderRight: `1px solid ${darkBorder}`,
                            bgcolor: `${matBlack}95`,
                        }}
                        sm={4}
                    >
                        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
                    </Grid>

                    {/* Right content area */}
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            padding: '1rem 3rem',
                            background: cardGradient,
                        }}
                    >
                        {IconBtns}
                        
                        {/* Show loading state for group details */}
                        {groupDetails.isLoading ? (
                            <CircularProgress sx={{ mt: 4 }} />
                        ) : groupName && (
                            <>
                                {GroupName}

                                <Typography
                                    margin={'2rem'}
                                    alignSelf={'flex-start'}
                                    variant="body1"
                                    color="white"
                                >
                                    Members
                                </Typography>

                                <Stack
                                    maxWidth={'45rem'}
                                    width={'100%'}
                                    boxSizing={'border-box'}
                                    padding={{
                                        sm: '1rem',
                                        xs: '0',
                                        md: '1rem 4rem',
                                    }}
                                    spacing={'2rem'}
                                    height={'50vh'}
                                    overflow={'auto'}
                                    sx={{
                                        background: `${darkPrimary}95`,
                                        backdropFilter: 'blur(12px)',
                                        borderRadius: '1rem',
                                        border: `1px solid ${darkBorder}`,
                                        boxShadow: `0 0 20px ${matBlack}50`,
                                    }}
                                >
                                    {isLoadingRemoveMember ? <CircularProgress /> : members.map(user => (
                                        <UserItem
                                            key={user._id}
                                            user={user}
                                            isAdded
                                            sx={{
                                                background: highlightGradient,
                                                transition: 'all 0.3s ease',
                                                borderRadius: '0.5rem',
                                                '& .MuiTypography-root': {
                                                    color: 'white',
                                                },
                                                '&:hover': {
                                                    transform: 'translateX(8px)',
                                                    background: `${lightBlue}20`,
                                                },
                                            }}
                                            handler={removeMemberHandler}
                                        />
                                    ))}
                                </Stack>
                                {ButtonGroup}
                            </>
                        )}
                    </Grid>

                    {/* ...existing dialogs and drawer... */}
                    {/* AddMember Dialog */}
                    {isAddMember && (
                        <Suspense fallback={<Backdrop open={true} />}>
                            <AddMemberDialog
                              
                                onClose={closeAddMemberHandler}
                                chatId={chatId}
                            />
                        </Suspense>
                    )}

                    {/* Confirm Delete Dialog */}
                    {confirmDeleteDialog && (
                        <Suspense fallback={<Backdrop open={true} />}>
                            <ConfirmDeleteDialog
                                open={confirmDeleteDialog}
                                handleClose={closeConfirmDeleteHandler}
                                deleteHandler={deleteHandler}
                            />
                        </Suspense>
                    )}

                    <Drawer
                        sx={{
                            display: {
                                xs: 'block',
                                sm: 'none',
                            },
                        }}
                        open={isMobileMenuOpen}
                        onClose={handleMobileClose}
                    >
                        <GroupsList
                            w={'50vw'}
                            myGroups={myGroups?.data?.groups}
                            chatId={chatId}
                            
                        />
                    </Drawer>
                </Grid>
            )}
        </>
    );
};

const GroupsList = ({ w = '100%', myGroups = [], chatId }) => (
    <Stack
        width={w}
        sx={{
            backgroundImage: bgGradient,
            height: '100vh',
            overflow: 'auto',
        }}
    >   
    <div className='text-lg p-4 border-b border-gray-700'>
        Manage Groups
    </div>
        {myGroups.length > 0 ? (
            myGroups.map(group => (
                <GroupListItem group={group} chatId={chatId} key={group._id} />
            ))
        ) : (
            <Typography color='white' textAlign={'center'} padding="1rem">
                No groups
            </Typography>
        )}
    </Stack>
);
const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group;
    const isSelected = chatId === _id;

    return (
        <Link
            to={`?group=${_id}`}
            onClick={e => {
                if (isSelected) e.preventDefault();
            }}
        >
            <Stack
                direction="row"
                spacing="1rem"
                alignItems="center"
                sx={{
                    color: 'white',
                    padding: '1rem',
                    borderBottom: `1px solid ${darkBorder}`,
                    position: 'relative',
                    bgcolor: isSelected ? 'indigo' : 'transparent',
                    borderLeft: isSelected
                        ? `4px solid ${lightBlue}`
                        : '4px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: isSelected
                            ? `${darkPrimary}`
                            : `${darkPrimary}`,
                        borderLeft: isSelected
                            ? `4px solid ${lightBlue}`
                            : `4px solid ${lightBlue}50`,
                    },
                }}
            >
                <AvatarCard avatar={avatar} />
                <Typography
                    sx={{
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? lightBlue : 'white',
                    }}
                >
                    {name}
                </Typography>
            </Stack>
        </Link>
    );
});

GroupListItem.displayName = 'GroupListItem';
GroupListItem.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.array.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    chatId: PropTypes.string,
};

export default Groups;
