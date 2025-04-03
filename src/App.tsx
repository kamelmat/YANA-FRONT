import AppRoutes from "./routes/AppRoutes"
import BottomNav from "./components/BottomNav"
import Header from "./components/Header"

import { BrowserRouter } from "react-router-dom"
import { Footer } from "./components/Footer"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <AppRoutes />
        <BottomNav />
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App
