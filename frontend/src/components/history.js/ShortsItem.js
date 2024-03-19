import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import person from "assets/images/person.png"

export const ShortsItem = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
      <img
        src={person}
        style={{ width: "200px", height: "300px", border: "1px solid black", borderRadius: "15px" }}
      ></img>
      <Typography variant="body1" style={{ margin: "5px 0px" }}>
        제목
      </Typography>
      <Typography variant="caption" style={{ margin: "5px 0px" }}>
        조회수 100회
      </Typography>
    </Box>
  )
}
