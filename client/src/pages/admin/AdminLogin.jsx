import { useInputValidation } from "6pp";
import {
  Box, Button, Paper, TextField,
  Typography
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { bgGradient, cardGradient, darkBorder, lightBlue } from "../../constants/color";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { useEffect } from "react";

export const AdminLogin = () => {
  const {isAdmin} = useSelector(state => state.auth);
  const secret = useInputValidation("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secret.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: bgGradient,
      padding: { xs: 2, sm: 3, md: 4 }
    }}>
      <Paper sx={{
        padding: 4,
        width: "100%",
        maxWidth: "450px",
        minHeight: "350px",
        background: cardGradient,
        border: `1px solid ${darkBorder}`,
        borderRadius: 2,
        boxShadow: `0 0 20px rgba(0,0,0,0.3)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4"
            sx={{
              textAlign: "center",
              color: "white",
              fontWeight: 700,
              mb: 4
            }}
          >
            Admin Login
          </Typography>

          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              required
              type="password"
              label="Secret Key"
              margin="normal"
              value={secret.value}
              onChange={secret.changeHandler}
              variant="standard"
              sx={{
                '& label': { color: 'grey.400' },
                '& label.Mui-focused': { color: "white" },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: darkBorder },
                  '&:hover fieldset': { borderColor: 'grey.400' },
                  '&.Mui-focused fieldset': { borderColor: lightBlue },
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                bgcolor: blueGrey,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}



export default AdminLogin