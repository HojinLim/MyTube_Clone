import { createTheme, ThemeProvider } from "@mui/material/styles"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { HomePage } from "pages/HomePage"
import React from "react"
import "./styles.css"
import Router from "router"
// 새로운 테마 생성

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#ffdee", // 주 색상
    },
    // 연한 파란색
    blue: {
      main: "#ffdee", // 보조 색상
    },
  },
  typography: {
    fontFamily: [
      "Arial", // 기본 글꼴
      "sans-serif",
    ].join(","),
  },
})
const App = () => {
  // Create a client

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}
export default App
