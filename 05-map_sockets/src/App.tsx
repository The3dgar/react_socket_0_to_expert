import { SocketProvider } from './context/SocketProvider';
import { MapPage } from './pages/MapPage';

export const App = () => {
  return (
    <SocketProvider>
      <MapPage />;
    </SocketProvider>
  );
};
