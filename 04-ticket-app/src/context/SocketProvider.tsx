import { useSocket } from '../hooks/useSocket';
import { SocketContext } from './SocketContext';

export const BACKEND_SERVER_URL = 'http://localhost:8080';

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, isOnline } = useSocket(BACKEND_SERVER_URL);

  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
