import "./App.css"
import { Typography, useTheme } from "@mui/material"
import BottomNav from "./components/BottomNav"
import { BrowserRouter } from "react-router-dom"

const App: React.FC = () => {
  const theme = useTheme()

  return (
    <BrowserRouter>
      <>
        <Typography variant="h1" sx={{ color: theme.colors.pink }}>
          You are not Alone
        </Typography>
        <BottomNav></BottomNav>
      </>
    </BrowserRouter>
  )
}

export default App
