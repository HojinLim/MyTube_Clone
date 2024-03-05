import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { styled } from "@mui/material/styles"
import { AppBar, Grid } from "@mui/material"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import { ToggleCategoryButton } from "./ToggleCategoryButton"
const StyledAppBar = styled(AppBar)({
  width: "100%",
})
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))
export default function VideosContainer() {
  return (
    <Container sx={{ width: "100%", border: "1px solid black", marginTop: "100px" }}>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", width: "100%" }}>
        <ToggleCategoryButton />
      </Box>
    </Container>
  )
}
