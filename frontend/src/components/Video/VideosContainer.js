import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { styled } from "@mui/material/styles"
import { AppBar, Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import { CategoryButton } from "../CategoryButton"
import Avatar from "@mui/material/Avatar"
import { VideoContainer } from "./VideoContainer"
const StyledAppBar = styled(AppBar)({
  width: "100%",
})

export default function VideosContainer() {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "130px",
        marginLeft: "15vw",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        backgroundColor: "#cfeeee",
        paddingTop: "30px",
      }}
    >
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
      <VideoContainer />
    </div>
  )
}
