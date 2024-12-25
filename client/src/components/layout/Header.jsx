import { Backdrop, Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { BGCOLOR } from '../../constants/color';
import { Add as AddIcon, Menu as MenuIcon, Search as SearchIcon,Group as GroupIcon,Logout as LogoutIcon,Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Suspense, useState } from 'react';

import { Search as SearchDialog } from '../../specific/Search';
import {Notifications as NotifcationDialog} from '../../specific/Notifications';
import {NewGroup as NewGroupDialog} from '../../specific/NewGroup';
import { Link } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();
  const [ isSearch, setIsSearch]= useState(false);
    
    const [isNotification,setIsNotification] = useState(false); 
    
    const [isNewGroup,setIsNewGroup] = useState(false);


  const navigateToGroup = () => {
    navigate("/groups");
  }

  const handleMobile = () => {
    console.log("Mobile");
  }

  const openSearch = () => {
    setIsSearch((prev) => !prev);
    console.log("Search Dialouge");
  }

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("New Group");
  }
  const openNotification = () => {
    setIsNotification((prev) => !prev);
    console.log("Notification");
  }
  const logoutHandler = () => { 
    
    console.log("Logout");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: BGCOLOR,
          }}
        >
          <Toolbar>
          <Link to="/" >
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Pulse
            </Typography>
          </Link>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            {/* right side icons */}

            <Box>
            <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                // value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={
          <Backdrop 
            open={true}
            sx={{ 
              color: '#fff', 
              zIndex: (theme) => theme.zIndex.drawer + 1 
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={
          <Backdrop 
            open={true}
            sx={{ 
              color: '#fff', 
              zIndex: (theme) => theme.zIndex.drawer + 1 
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={
          <Backdrop 
            open={true}
            sx={{ 
              color: '#fff', 
              zIndex: (theme) => theme.zIndex.drawer + 1 
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }>
          <NewGroupDialog />
        </Suspense>
      )}

    </>
  )
}


const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton color="inherit" size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
};

IconBtn.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Header;