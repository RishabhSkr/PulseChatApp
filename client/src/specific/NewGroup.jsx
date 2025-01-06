import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import UserItem from '../components/shared/UserItem';
import { sampleUsers } from '../constants/sampleData';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useAvailableFriendsQuery,
    useNewGroupMutation,
} from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { setIsNewGroup } from '../redux/reducers/misc';
import toast from 'react-hot-toast';

export const NewGroup = () => {
    const dispatch = useDispatch();
    const { isNewGroup } = useSelector(state => state.misc);
    const { isError, isLoading, error, data = {} } = useAvailableFriendsQuery();
    const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
    const groupName = useInputValidation('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const errors = [{ isError, error }];
    useErrors(errors);

    const selectMemberHandler = id => {
        setSelectedMembers(prev =>
            prev.includes(id)
                ? prev.filter(currElement => currElement !== id)
                : [...prev, id]
        );
    };

    const createGroupHandler = () => {
        if (!groupName.value) return toast.error('Group name is required');
        if (selectedMembers.length < 2)
            return toast.error('Select at least 2 member');
        newGroup('Creating New Group...', {
            name: groupName.value,
            members: selectedMembers,
        });
        closeHandler();
    };
    const closeHandler = () => {
        dispatch(setIsNewGroup(false));
    };

    return (
        <>
            <Dialog
                open={isNewGroup}
                onClose={closeHandler}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1f2937',
                        color: 'white',
                        minWidth: { xs: '80%', sm: '400px' },
                    },
                }}
            >
                <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'24rem'}>
                    <DialogTitle
                        sx={{ color: 'white', fontSize: '1.5rem', pb: 2 }}
                    >
                        New Group
                    </DialogTitle>

                    <div className="relative">
                        <input
                            type="text"
                            value={groupName.value}
                            onChange={groupName.changeHandler}
                            placeholder="Type Group Name..."
                            className="w-full px-4 py-2 pl-10 text-sm rounded-lg bg-gray-700 border-gray-600 
            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <Typography
                        variant="body2"
                        sx={{ color: 'gray.400', mt: 1 }}
                    >
                        Select members
                    </Typography>
                    <Stack>
                        {isLoading ? (
                            <Typography color="gray.400">
                                Loading friends...
                            </Typography>
                        ) : data?.friends?.length > 0 ? (
                            data.friends.map(user => (
                                <UserItem
                                    user={user}
                                    key={user._id}
                                    handler={selectMemberHandler}
                                    isAdded={selectedMembers.includes(user._id)}
                                    sx={{ color: 'white' }}
                                />
                            ))
                        ) : (
                            <Typography color="gray.400">
                                No friends available
                            </Typography>
                        )}
                    </Stack>

                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        margin={{ xs: '1rem 0', sm: '2rem 0' }}
                        spacing={2}
                    >
                        <Button
                            size="small"
                            sx={{
                                bgcolor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                '&:hover': {
                                    bgcolor: 'rgba(239, 68, 68, 0.2)',
                                },
                            }}
                            onClick={closeHandler}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                bgcolor: '#3b82f6',
                                '&:hover': { bgcolor: '#2563eb' },
                                color: 'white',
                            }}
                            onClick={createGroupHandler}
                            disabled={isLoadingNewGroup}
                        >
                            Create Group
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};
