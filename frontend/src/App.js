import { createTheme, ThemeProvider } from "@mui/material/styles"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { HomePage } from "pages/HomePage"
import React from "react"
import "./styles.css"
import Router from "router"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"

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
      secondary: "#026be3", // 보조 색상
    },
  },
  typography: {
    fontFamily: [
      "Arial", // 기본 글꼴
      "sans-serif",
    ].join(","),
  },
})

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("strapi-token")
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   }
// })
// const client = new ApolloClient({
//   link: authLink.concat(createHttpLink({ uri: process.env.REACT_APP_BACKEND_URL })),

const client = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_BACKEND_URL }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  )
}
export default App
