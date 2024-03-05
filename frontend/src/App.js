import { createTheme, ThemeProvider } from "@mui/material/styles"

import { MainPage } from "pages/MainPage"
import React from "react"
// 새로운 테마 생성

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // 주 색상
    },
    // 연한 파란색
    blue: {
      main: "#03a9f4", // 보조 색상
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
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  )
}
export default App
