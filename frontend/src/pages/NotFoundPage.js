import React from "react"
import { Link } from "react-router-dom"
import { Container, Typography, Button } from "@mui/material"

export const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Typography variant="body1" gutterBottom>
        죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        홈으로 돌아가기
      </Button>
    </Container>
  )
}
