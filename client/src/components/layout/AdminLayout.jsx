import { useState } from 'react'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from "@mui/material";  // Use stable Grid import
import { grey } from '@mui/material/colors';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { Link as LinkComponent, useLocation, useNavigate } from 'react-router-dom';
import { matBlack } from '../../constants/color';

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: inherit;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    background-color: ${grey[200]};
  }
  `;
const adminTabs = [
  {
    name: 'Dashboard',
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: 'Users',
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: 'Chats',
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: 'Messages',
    path: "/admin/messages",
    icon: <MessageIcon />,
  }
];

const Sidebar = ({ w = "100%" }) => {

  const location = useLocation();
  const logoutHandler = () => {
    console.log('Logout')
  }

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
     
     <Typography variant="h5"  textTransform="uppercase">Admin Panel</Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (

          <Link to={tab.path} key={tab.path}>
          
          <Stack  direction={"row"} alignItems={"center"} spacing={"1rem"}
               sx={{
                ...(location.pathname === tab.path && {
                  borderRadius: 10,
                  bgcolor: matBlack,
                  padding: '1rem 2rem',
                  color: 'white',
                  ":hover": {
                    color: 'white'
                  }
                })
              }}
            >
              {tab.icon}
              <Typography variant="body1">{tab.name}</Typography>

            </Stack>

          </Link>
        ))}

        <Link onClick={logoutHandler}>
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                  <ExitToAppIcon />
                  <Typography>Logout</Typography>
                </Stack>
          </Link>
      </Stack>
    </Stack>
  )
}

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobileOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
 
  if(!isAdmin) {
    return navigate('/admin');
  }
  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(!isMobileOpen)
    console.log('Mobile menu open')
  }
  return (

    <Grid container sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          },
          borderRight: '1px solid',
          borderColor: grey[300],
          position: 'fixed',
          top: "1rem",
          right: "1rem",
          
        }}
      >
        <IconButton onClick={handleMobileMenuOpen}
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <Sidebar />
      </Grid>

      <Grid item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgColor: grey[100],
          p: 2
        }}
      >
        {children}
      </Grid>

        
      <Drawer open={isMobileOpen} onClose={handleMobileMenuOpen}>
        <Sidebar w={"50vh"} />
      </Drawer>

    </Grid>

  );
}

export default AdminLayout