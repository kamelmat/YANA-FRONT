import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import theme from "./theme.ts"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import './i18n'

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>
)
