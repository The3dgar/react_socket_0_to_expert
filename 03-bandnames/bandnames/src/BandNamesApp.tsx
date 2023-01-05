import HomePage from './pages/HomePage'
import { SocketProvider } from './context/SocketProvider'

export const BandNamesApp = () => {
  return (
    <SocketProvider >
      <HomePage/>
    </SocketProvider>
  )
}
