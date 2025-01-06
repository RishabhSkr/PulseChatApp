import {
    Add as AddIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    CircularProgress,
    IconButton,
    Toolbar,
    Tooltip,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Suspense, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BGCOLOR } from '../../constants/color';
import { SERVER_URL } from '../../constants/config';
import { userNotExist } from '../../redux/reducers/auth';
import { NewGroup as NewGroupDialog } from '../../specific/NewGroup';
import { Notifications as NotifcationDialog } from '../../specific/Notifications';
import { Search as SearchDialog } from '../../specific/Search';
import Logo from '../shared/Logo';
import {
    setIsMobileMenuChats,
    setIsNotification,
    setIsSearch,
    setIsNewGroup,
} from '../../redux/reducers/misc';
import { resetNotificationCount } from '../../redux/reducers/chat';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc);
    const { notificationCount } = useSelector(state => state.chat);

    const navigateToGroup = () => {
        navigate('/groups');
    };

    const handleMobile = () => {
        dispatch(setIsMobileMenuChats(true));
    };

    const openSearch = () => {
        dispatch(setIsSearch(true));
    };

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
    };
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    };
    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(
                `${SERVER_URL}/api/v1/user/logout`,
                {
                    withCredentials: true,
                }
            );
            dispatch(userNotExist());
            toast.success(data.message);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || 'Something went wrong'
            );
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={'4rem'}>
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: BGCOLOR,
                    }}
                >
                    <Toolbar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: 'block', sm: 'none' },
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
                                title={'Search'}
                                icon={<SearchIcon />}
                                onClick={openSearch}
                            />

                            <IconBtn
                                title={'New Group'}
                                icon={<AddIcon />}
                                onClick={openNewGroup}
                            />

                            <IconBtn
                                title={'Manage Groups'}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />

                            <IconBtn
                                title={'Notifications'}
                                icon={<NotificationsIcon />}
                                onClick={openNotification}
                                value={notificationCount}
                            />

                            <IconBtn
                                title={'Logout'}
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {isSearch && (
                <Suspense
                    fallback={
                        <Backdrop
                            open={true}
                            sx={{
                                color: '#fff',
                                zIndex: theme => theme.zIndex.drawer + 1,
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                >
                    <SearchDialog />
                </Suspense>
            )}

            {isNotification && (
                <Suspense
                    fallback={
                        <Backdrop
                            open={true}
                            sx={{
                                color: '#fff',
                                zIndex: theme => theme.zIndex.drawer + 1,
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                >
                    <NotifcationDialog />
                </Suspense>
            )}

            {isNewGroup && (
                <Suspense
                    fallback={
                        <Backdrop
                            open={true}
                            sx={{
                                color: '#fff',
                                zIndex: theme => theme.zIndex.drawer + 1,
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                >
                    <NewGroupDialog />
                </Suspense>
            )}
        </>
    );
};

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title} arrow>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {value ? <Badge badgeContent={value}>{icon}</Badge> : icon}
            </IconButton>
        </Tooltip>
    );
};

IconBtn.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number,
};

export default Header;
