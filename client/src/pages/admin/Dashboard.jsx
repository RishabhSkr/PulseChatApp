import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Done,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { matBlack } from '../../constants/color';

import {
  DoughnutChart,
  LineChart
} from "../../specific/Chart";
import { useErrors } from '../../hooks/hook';
import { Layoutloader } from '../../components/layout/loaders';
import { useDahsboardQuery } from '../../redux/api/api';

const Dashboard = () => {

  const {
    data,
    error,
    isLoading,
    isError,
  } = useDahsboardQuery();
  

  const { stats } = data || {};

  useErrors([
    {
      isError: isError,
      error: error,
    },
  ]);
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ 
        padding: { xs: "1rem", sm: "2rem" },  // Responsive padding
        margin: "2rem 0", 
        borderRadius: "1rem",
        overflow: "hidden"  // Prevent overflow
      }}
    >
      <Stack 
        direction={"row"} 
        alignItems={"center"} 
        spacing={{ xs: "0.5rem", sm: "1rem" }}  // Responsive spacing
        sx={{
          overflowX: "auto",  // Allow horizontal scroll if needed
          minWidth: 0,        // Allow shrinking
          width: "100%"
        }}
      >
        <AdminPanelSettingsIcon sx={{ 
          fontSize: { xs: "2rem", sm: "3rem" }  // Responsive icon size
        }} />

        <SearchField 
          placeholder="Search..." 
          sx={{ 
            minWidth: { xs: "120px", sm: "200px" }  // Responsive search field
          }} 
        />

        <CurveButton sx={{ 
          display: {  sm: "block" }  ,
        }}>
          Search
        </CurveButton>

        <Box flexGrow={1} />
        
        <Typography
          display={{
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
          noWrap  // Prevent text wrapping
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationsIcon sx={{ 
          fontSize: { xs: "1.5rem", sm: "2rem" }  // Responsive icon size
        }} />
      </Stack>
    </Paper>
  );


  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.totalUsers} Icon={<PersonIcon />} />
      <Widget
        title={"Chats"}
        value={stats?.totalChats}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={stats?.totalMessages}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  return (
    <AdminLayout>
    {isLoading?<Layoutloader/>:
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row"
          }}
          flexWrap={"wrap"}
          justifyContent={"space-between"}  // Changed from center to space-between
          alignItems={"stretch"}            // Changed alignment
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: {                      // Responsive width
                xs: "100%",
                lg: "60%"                   // Adjusted width for large screens
              },
              minWidth: "300px",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={stats?.messages} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {                      // Responsive width
                xs: "100%",
                lg: "35%"                   // Adjusted width for large screens
              },
              minWidth: "300px",
              position: "relative",
            }}
          >
            <DoughnutChart value={[stats?.groupsCounts || 0,stats?.totalChats-stats?.groupsCounts || 0]} labels={["Group Chats","Individual Chats"]} />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs </Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    }
    </AdminLayout>

  )
}


const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);


export default Dashboard