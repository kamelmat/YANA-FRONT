// import AppRoutes from "./routes/AppRoutes"
// import BottomNav from "./components/BottomNav"

import { BrowserRouter } from "react-router-dom"
import { Footer } from "./components/Footer"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <>
        {/* <AppRoutes /> */}
        {/* <BottomNav></BottomNav> */}
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App
