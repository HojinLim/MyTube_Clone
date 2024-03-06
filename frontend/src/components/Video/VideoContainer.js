import React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import Typography from "@mui/material/Typography"

import Avatar from "@mui/material/Avatar"
export const VideoContainer = () => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "column",
        display: "flex",
        gap: "10px",
      }}
    >
      {/* 영상 길이 */}
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          bgcolor: "#ccc",
          width: "350px",
          height: "200px",
          borderRadius: "20px",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "white",
            backgroundColor: "black",
            padding: "1px",
            margin: "10px",
            borderRadius: "2px",
          }}
          variant="body2"
          gutterBottom
        >
          27:13
        </Typography>
      </Box>
      {/* 프로필, 제목, 조회수 */}
      <Container
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Container
          sx={{
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Typography variant="h6" gutterBottom>
            -제목-
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            -채널명-
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            조회수 100회 ⦁ 10시간 전
          </Typography>
        </Container>
      </Container>
    </Container>
  )
}
