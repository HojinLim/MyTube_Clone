import React from "react"
import { ShortsItem } from "./ShortsItem"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"

export const ShortsContainer = () => {
  const StyledGrid = styled("div")(({ theme }) => ({
    border: "3px solid black",

    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100vw",
    padding: theme.spacing(0.5),

    flexDirection: "row",
    // justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      paddingTop: "30px",
      justifyContent: "center", // 수평 가운데 정렬
      alignItems: "center",
      paddingTop: "50px",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      margin: "auto",
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      paddingTop: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      // paddingTop: "50px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "50%",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      paddingTop: "50px",
    },
  }))

  return (
    <StyledGrid>
      <ShortsItem />
      <ShortsItem />
      <ShortsItem />
      <ShortsItem />
    </StyledGrid>
  )
}
