import "./App.css"
import { Typography, useTheme } from "@mui/material"
import BottomNav from "./components/BottomNav"

function App() {
  const theme = useTheme()

  return (
    <>
      <Typography variant="h1" sx={{ color: theme.colors.pink }}>
        You are not Alone
      </Typography>
      <BottomNav></BottomNav>
    </>
  )
}

export default App
