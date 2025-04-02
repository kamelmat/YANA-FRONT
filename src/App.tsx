import AppRoutes from "./routes/AppRoutes"
import BottomNav from "./components/BottomNav"
import { BrowserRouter } from "react-router-dom"
import { MapView } from "./components/MapView"

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <>
        <MapView />
        <BottomNav></BottomNav>
      </>
    </BrowserRouter>
  )
}

export default App
