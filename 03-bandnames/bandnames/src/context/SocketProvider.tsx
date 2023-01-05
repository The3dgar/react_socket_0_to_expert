import { useSocket } from '../hooks/useSocket';
import { SocketContext } from './SocketContext';

const socketUrl = 'http://localhost:8080';

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, isOnline } = useSocket(socketUrl);

  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
