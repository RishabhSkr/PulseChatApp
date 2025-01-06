import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { darkBorder,cardGradient,lightBlue,highlightGradient} from "../constants/color";
import { useState } from 'react'
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';
import { Layoutloader } from '../components/layout/loaders';

const AddMemberDialog =  ({chatId }) => {
    const dispatch = useDispatch();
    const [AddMember,isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation)
    const {isAddMember} = useSelector((state)=>state.misc)
    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]
        );
    }
   
    const addMemberSubmitHandler = () => {
        AddMember("Adding Members...", { members: selectedMembers, chatId });
        closeHandler();
      };
    const closeHandler = () => { 
        setSelectedMembers([]);
        dispatch(setIsAddMember(false));
        
    };
    useErrors([{isError,error}]);

    return (
        <Dialog 
            open = {isAddMember}
            onClose={closeHandler}
            PaperProps={{
                sx: {
                    background: cardGradient,
                    color: "white",
                    minWidth: "350px",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${darkBorder}`,
                }
            }}
        >
            <Stack spacing={2} p={2}>
                <DialogTitle sx={{ color: "white", pb: 2, borderBottom: `1px solid ${darkBorder}` }}>
                    Add Member
                </DialogTitle>
                <Stack spacing={1}>
                    {isLoading ? <Layoutloader/> : data?.friends?.length> 0 ? (
                        data?.friends?.map((user) => (
                            <UserItem 
                                key={user._id} 
                                user={user}
                                handler={selectMemberHandler} 
                                isAdded={selectedMembers.includes(user._id)}
                                sx={{
                                    background: highlightGradient,
                                    borderRadius: "0.5rem",
                                    transition: "all 0.3s ease",
                                    "& .MuiTypography-root": {
                                        color: "white",
                                    },
                                    "&:hover": {
                                        transform: "translateX(8px)",
                                        background: `${lightBlue}20`,
                                    }
                                }}
                            />
                        ))
                    ) : (
                        <Typography textAlign={"center"} color="gray">
                            No Friends
                        </Typography>
                    )}
                </Stack>
                <Stack direction="row" spacing={2} p={2} justifyContent="flex-end">
                    <Button color='error' onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={addMemberSubmitHandler}
                        variant='contained'
                        disabled={isLoadingAddMember}
                        sx={{
                            bgcolor: lightBlue,
                            "&:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        Add Members
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog