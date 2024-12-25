import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Paper, Stack, Typography, Container } from '@mui/material'
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import moment from 'moment'
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { matBlack } from '../../constants/color';

import {
  LineChart,
  DoughnutChart
} from "../../specific/Chart"
import zIndex from '@mui/material/styles/zIndex';


const Dashboard = () => {

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
          display: {  sm: "block" }  
        }}>
          Search
        </CurveButton>

        <Box flexGrow={1} />
        
        <Typography
          display={{
            xs: "none",
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
      <Widget title={"Users"} value={123} Icon={<PersonIcon />} />
      <Widget
        title={"Chats"}
        value={344}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={783}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  return (
    <AdminLayout>
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
            <LineChart value={[65, 59, 80, 81, 56, 55, 40]} />
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
            <DoughnutChart value={[300,450]} labels={["Group Chats","Individual Chats"]} />
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