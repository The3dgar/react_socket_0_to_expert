import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface SocketContextProps {
  socket: any;
  isOnline: boolean;
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);
