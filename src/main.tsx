import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { CssBaseline } from "@mui/material"
import './i18n'
import ThemeProvider from './theme/ThemeProvider'

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>
)
