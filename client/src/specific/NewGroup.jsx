import { useInputValidation } from "6pp"
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material"
import UserItem from "../components/shared/UserItem"
import { sampleUsers } from "../constants/sampleData"
import { useState } from "react"

export const NewGroup = () => {
  const groupName = useInputValidation("");
  const [member, setMembers]= useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
   
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]
  );
}
console.log(selectedMembers);

  const createGroupHandler = () => {
    console.log("Create Group")
  }
  
  return <>
    <Dialog 
      open
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
        <Typography variant="body2" sx={{ color: 'gray.400', mt: 1 }}>
          Select members
        </Typography>
        <Stack  >
        {sampleUsers.map((user) => (
              <UserItem 
                user={user} 
                key={user._id} 
                handler={selectMemberHandler}
                isAdded = {selectedMembers.includes(user._id)}
                sx={{ color: 'white' }}
              />
            ))}
        </Stack>
        
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <Button 
            size="small"
            sx={{
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
            }}
            onClick={createGroupHandler}
          >
            Cancel
          </Button>

          <Button 
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
              color: 'white'
            }}
            onClick={(e) =>{e.preventDefault()} }
          >
            Create Group
          </Button>
          
          
        </Stack>
      </Stack>
    </Dialog>
  </>
}
