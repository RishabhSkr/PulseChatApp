import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { darkBorder,cardGradient,lightBlue,highlightGradient} from "../constants/color";
import { useState } from 'react'

const AddMemberDialog = ({ addMember, isLoadingMember, chatId, onClose }) => {

    const [member, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]
        );
    }
   
    const addMemberSubmitHandler = () => {
        closeHandler();
    }
    const closeHandler = () => { 
        setMembers([]);
        setSelectedMembers([]);
        onClose(); // Add this line to close the dialog
    };
    return (
        <Dialog 
            open 
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
                    {member.length > 0 ? (
                        member.map((user) => (
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
                        disabled={isLoadingMember}
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