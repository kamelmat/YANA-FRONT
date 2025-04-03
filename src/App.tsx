import AppRoutes from "./routes/AppRoutes"
import BottomNav from "./components/BottomNav"
import Sidebar from "./components/Sidebar"

import { BrowserRouter } from "react-router-dom"

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <>
      <Sidebar />
        <AppRoutes />
        <BottomNav></BottomNav>
      </>
    </BrowserRouter>
  )
}

export default App
