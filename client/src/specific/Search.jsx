import { Dialog, List } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {useInputValidation} from '6pp';
import UserItem from "../components/shared/UserItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../redux/reducers/misc";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../redux/api/api";
import { useEffect } from "react";
import { useAsyncMutation } from "../hooks/hook";

export const Search = () => {
  const searchQuery = useInputValidation("");
  const {isSearch} = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const [searchUser] =useLazySearchUserQuery();
  const [users,setUsers] = useState([]); 

  const [sendFriendRequest, isLoadingSendFriendReq] = useAsyncMutation(useSendFriendRequestMutation);
  
  const addFriendHandler = async (id) => {
    try {
      await sendFriendRequest(
        "Sending friend request...",
        { userId: id }  
      );
    } catch (error) {
      console.error("Friend request error:", error);
    }
  }

  const handleSearchClose= ()=>{
    dispatch(setIsSearch(false));
  }
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(searchQuery.value)
        .then(({ data }) => {
          if (data?.users) {
            setUsers(data.users);
          }
        })
        .catch((err) => console.log(err));
    }, 500); 
    
    return () => clearTimeout(timeOutId);
  }, [searchQuery.value, searchUser])

  return (
    <Dialog 
      open={isSearch }
      onClose={handleSearchClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1f2937',
          color: 'white',
          minWidth: { xs: '90%', sm: '400px' }
        }
      }}
    >
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Find People
        </h2>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery.value}
            onChange={searchQuery.changeHandler}
            placeholder="Search users..."
            className="w-full px-4 py-2 pl-10 text-sm rounded-lg bg-gray-700 border-gray-600 
            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        </div>

        <div className="mt-4">
          <List sx={{ 
            maxHeight: '60vh', 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#374151',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#4B5563',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#6B7280',
            },
          }}>
            {users.map((user) => (
              <UserItem 
                user={user} 
                key={user._id} 
                handler={addFriendHandler} 
                handlerIsLoading={isLoadingSendFriendReq}
                sx={{ color: 'white' }}
              />
            ))}
          </List>
        </div>
      </div>
    </Dialog>
  );
};

