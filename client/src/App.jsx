import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectRoute from './components/auth/ProtectRoute';
import axios from 'axios';
import { SERVER_URL } from './constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducers/auth';
import { CommonLoader } from './components/layout/loaders';
import { Toaster } from 'react-hot-toast';
import {SocketProvider }from './socket';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const Error404 = lazy(() => import('./pages/Error404'));

// Admin
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagament'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessagesManagement = lazy(() =>
    import('./pages/admin/MessageManagement')
);

function App() {
    const { user, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/api/v1/user/me`, {
                withCredentials: true,
            })
            .then(res => {
                dispatch(userExist(res.data));
            })
            .catch(err => {
                dispatch(userNotExist());
            });
    }, [dispatch]);

    return (
        <Router>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            <Suspense fallback={<CommonLoader />}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        element={
                            <SocketProvider>
                                <ProtectRoute user={user} isLoading={isLoading} />
                            </SocketProvider>
                        }
                    >
                        <Route path="/chatHome" element={<Home />} />
                        <Route path="/chat/:chatId" element={<Chat />} />
                        <Route path="/groups" element={<Groups />} />
                    </Route>

                    <Route element={<ProtectRoute user={!user} isLoading={isLoading} redirect="/" />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>

                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/chats" element={<ChatManagement />} />
                    <Route
                        path="/admin/messages"
                        element={<MessagesManagement />}
                    />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
