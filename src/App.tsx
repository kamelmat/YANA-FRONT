import AppRoutes from "./routes/AppRoutes"
import BottomNav from "./components/BottomNav"
import Header from "./components/Header"

import { BrowserRouter } from "react-router-dom"

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <>
        <Header />
        <AppRoutes />
        <BottomNav />
      </>
    </BrowserRouter>
  )
}

export default App
