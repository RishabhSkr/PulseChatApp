import { Paper, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { VisuallyHiddenInput } from './styles/StyledComponent';
import { usernameValidator } from '../utils/validators';
import {
    Avatar,
    IconButton,
    Stack,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import {
    bgGradient,
    cardGradient,
    darkBorder,
    lightBlue,
} from '../constants/color';
import { blueGrey } from '@mui/material/colors';
import axios from 'axios';
import { SERVER_URL } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExist, userNotExist } from '../redux/reducers/auth';
import { toast } from 'react-hot-toast';
import Logo from './shared/Logo';
import { useState } from 'react';

export const Auth = ({ type }) => {
    const dispatch = useDispatch();
    const name = useInputValidation('');
    const bio = useInputValidation('');
    const username = useInputValidation('', usernameValidator);
    const password = useStrongPassword('');
    const avatar = useFileHandler('single');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleLoginSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Signing In...');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        axios
            .post(
                `${SERVER_URL}/api/v1/user/login`,
                {
                    username: username.value,
                    password: password.value,
                },
                config
            )
            .then(res => {
                dispatch(userExist({ user: res.data.user }));
                toast.success(res.data.message, {
                    id: toastId,
                });
                setIsNavigating(true);
                setTimeout(() => {
                    navigate('/');
                }, 500);
            })
            .catch(err => {
                dispatch(userNotExist());
                toast.error(
                    err?.response?.data?.message || 'Something went wrong'
                );
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Signing Up...');

        const formData = new FormData();
        formData.append('avatar', avatar.file);
        formData.append('name', name.value);
        formData.append('bio', bio.value);
        formData.append('username', username.value);
        formData.append('password', password.value);

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const { data } = await axios.post(
                `${SERVER_URL}/api/v1/user/signup`,
                formData,
                config
            );

            dispatch(userExist({ user: data.user }));
            toast.success(data.message, {
                id: toastId,
            });
            setIsNavigating(true);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            dispatch(userNotExist());
            toast.error(error?.response?.data?.message || 'Something Went Wrong', {
                id: toastId,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isNavigating && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress size={60} sx={{ color: lightBlue }} />
                </Box>
            )}

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: bgGradient,
                    padding: { xs: 2, sm: 3, md: 4 },
                }}
            >
                {/*  Logo  */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        alignSelf: 'flex-start',
                        paddingX: '1.5rem',
                        marginBottom: 4,
                    }}
                >
                    <Link to="/">
                        <Logo />
                    </Link>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Paper
                        sx={{
                            padding: 4,
                            width: '100%',
                            maxWidth: '450px',
                            minHeight: '400px',
                            background: cardGradient,
                            border: `1px solid ${darkBorder}`,
                            borderRadius: 2,
                            boxShadow: `0 0 20px rgba(0,0,0,0.3)`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        {type === 'login' ? (
                            <>
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: 700,
                                            mb: 4,
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
                                                '& label.Mui-focused': {
                                                    color: lightBlue,
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: lightBlue,
                                                    },
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
                                                '& label.Mui-focused': {
                                                    color: lightBlue,
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: lightBlue,
                                                    },
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
                                                '&:hover': {
                                                    bgcolor: 'primary.dark',
                                                },
                                            }}
                                            disabled={isLoading}
                                        >
                                            Login
                                        </Button>
                                    </form>
                                </Box>

                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: 'grey.400',
                                    }}
                                >
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        to="/signup"
                                        style={{
                                            color: lightBlue,
                                            textDecoration: 'none',
                                        }}
                                        disabled={isLoading}

                                    >
                                        Sign up
                                    </Link>
                                </Typography>
                            </>
                        ) : type === 'signup' ? (
                            <>
                                <div className="space-y-8">
                                    <h3 className="text-center text-2xl font-extrabold text-white">
                                        Create an account
                                    </h3>

                                    <form
                                        className="space-y-6"
                                        onSubmit={handleSignupSubmit}
                                    >
                                        <Stack
                                            position={'relative'}
                                            width={'10rem'}
                                            margin={'auto'}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: '10rem',
                                                    height: '10rem',
                                                    objectFit: 'contain',
                                                }}
                                                src={avatar.preview}
                                            />

                                            <IconButton
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    right: '0',
                                                    color: 'white',
                                                    bgcolor: 'rgba(0,0,0,0.5)',
                                                    ':hover': {
                                                        bgcolor: 'rgba(0,0,0,0.7)',
                                                    },
                                                }}
                                                component="label"
                                            >
                                                <>
                                                    <CameraAltIcon />
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={
                                                            avatar.changeHandler
                                                        }
                                                    />
                                                </>
                                            </IconButton>
                                        </Stack>

                                        {avatar.error && (
                                            <Typography
                                                m={'1rem auto'}
                                                width={'fit-content'}
                                                display={'block'}
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
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                },
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
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                },
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
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                },
                                            }}
                                        />

                                        {username.error && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
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
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: darkBorder,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'grey.400',
                                                    },
                                                },
                                            }}
                                        />
                                        {password.error && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {password.error}
                                            </Typography>
                                        )}
                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            disabled={isLoading}
                                        >
                                            Sign Up
                                        </button>
                                    </form>
                                </div>
                                <div className="text-center text-sm text-white pt-4">
                                    Already have an account?{' '}
                                    <Link
                                        disabled={isLoading}
                                        to="/login"
                                        className="font-medium text-indigo-300 hover:text-indigo-500 ml-1"
                                    >
                                        Login here
                                    </Link>
                                </div>
                            </>
                        ) : null}
                    </Paper>
                </Box>
            </Box>
        </>
    );
};

Auth.propTypes = {
    type: PropTypes.string.isRequired,
};
