import { Router } from './routes/Router';
import { UiContextProvider } from './context/UiContext';
import { SocketProvider } from './context/SocketProvider';

function App() {
  return (
    <SocketProvider>
      <UiContextProvider>
        <Router />
      </UiContextProvider>
    </SocketProvider>
  );
}

export default App;
