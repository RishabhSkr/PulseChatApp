import { createContext, useMemo,useContext} from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from './constants/config';

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(SERVER_URL, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
