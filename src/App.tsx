import AppRoutes from "./routes/AppRoutes"
import BottomNav from "./components/BottomNav"

import { BrowserRouter } from "react-router-dom"

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <>
        <AppRoutes />
        <BottomNav></BottomNav>
      </>
    </BrowserRouter>
  )
}

export default App
