import { Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material"
import { VisuallyHiddenInput } from "./styles/StyledComponent";
import { usernameValidator } from "../utils/validators";
import {
    Avatar,
    IconButton,
    Stack,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { bgGradient, cardGradient, darkBorder,  lightBlue } from "../constants/color";
import { blueGrey } from '@mui/material/colors';

export const Auth = ({ type }) => {

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useStrongPassword("");

    const avatar = useFileHandler("single");


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
    };


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
                minHeight: "400px",
                background: cardGradient,
                border: `1px solid ${darkBorder}`,
                borderRadius: 2,
                boxShadow: `0 0 20px rgba(0,0,0,0.3)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                {type === "login" ? (
                    <>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4"
                                sx={{
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: 700,
                                    mb: 4
                                }}
                            >
                                Welcome Back
                            </Typography>

                            <form onSubmit={handleLoginSubmit}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Username"
                                    margin="normal"
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    variant="standard"
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& label.Mui-focused': { color: lightBlue },
                                        '& .MuiInputBase-input': { color: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: darkBorder },
                                            '&:hover fieldset': { borderColor: 'grey.400' },
                                            '&.Mui-focused fieldset': { borderColor: lightBlue },
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    variant="standard"
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& label.Mui-focused': { color: lightBlue },
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

                        <Typography
                            sx={{
                                textAlign: "center",
                                color: "grey.400"
                            }}
                        >
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/signup"
                                style={{
                                    color: lightBlue,
                                    textDecoration: 'none'
                                }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </>
                ) : type === "signup" ? (
                    <>
                        <div className="space-y-8">
                            <h3 className="text-center text-2xl font-extrabold text-white">
                                Create an account
                            </h3>

                            <form className="space-y-6" onSubmit={handleSignupSubmit}>

                                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            objectFit: "contain",
                                        }}
                                        src={avatar.preview}
                                    />

                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            bottom: "0",
                                            right: "0",
                                            color: "white",
                                            bgcolor: "rgba(0,0,0,0.5)",
                                            ":hover": {
                                                bgcolor: "rgba(0,0,0,0.7)",
                                            },
                                        }}
                                        component="label"
                                    >
                                        <>
                                            <CameraAltIcon />
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={avatar.changeHandler}
                                            />
                                        </>
                                    </IconButton>
                                </Stack>

                                {avatar.error && (
                                    <Typography
                                        m={"1rem auto"}
                                        width={"fit-content"}
                                        display={"block"}
                                        color="error"
                                        variant="caption"
                                    >
                                        {avatar.error}
                                    </Typography>
                                )}

                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    variant="standard"
                                    value={name.value}
                                    onChange={name.changeHandler}
                                    
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: darkBorder },
                                            '&:hover fieldset': { borderColor: 'grey.400' },
                                        }
                                    }}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    label="Bio"
                                    margin="normal"
                                    variant="standard"
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: darkBorder },
                                            '&:hover fieldset': { borderColor: 'grey.400' },
                                        }
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    variant="standard"
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: darkBorder },
                                            '&:hover fieldset': { borderColor: 'grey.400' },
                                        }
                                    }}
                                />

                                {username.error && (
                                    <Typography color="error" variant="caption">
                                        {username.error}
                                    </Typography>
                                )}

                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    variant="standard"
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    sx={{
                                        '& label': { color: 'grey.400' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: darkBorder },
                                            '&:hover fieldset': { borderColor: 'grey.400' },
                                        }
                                    }}
                                />
                                {password.error && (
                                    <Typography color="error" variant="caption">
                                        {password.error}
                                    </Typography>
                                )}
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                        <div className="text-center text-sm text-white pt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-300 hover:text-indigo-500 ml-1">
                                Login here
                            </Link>
                        </div>
                    </>
                ) : null}
            </Paper>
        </Box>
    );
}


Auth.propTypes = {
    type: PropTypes.string.isRequired,
};

