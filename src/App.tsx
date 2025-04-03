import "./App.css"
import { Typography, useTheme } from "@mui/material"
import BottomNav from "./components/BottomNav"
import { BrowserRouter } from "react-router-dom"
import { MapView } from "./components/MapView"

const App: React.FC = () => {
  const theme = useTheme()

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
