import React from "react"

import { VideoContainer } from "./VideoContainer"
import { dummyData } from "dummy"
import { styled } from "@mui/material/styles"
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()
  const [state, toggleState] = useRecoilState(changeState)
  React.useEffect(() => {
    setDummy(dummyData)
  }, [dummyData])

  const StyledGrid = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "150%",
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
      width: "100%",
      justifyContent: "center", // 수평 가운데 정렬
      alignItems: "center",
      display: "grid",
      gridTemplateColumns: "1fr  1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      paddingTop: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      // backgroundColor: "#cfeeee",
      paddingTop: "50px",
    },
  }))

  return (
    <StyledGrid
      style={state ? { marginLeft: "220px", gap: "20px" } : { margin: "auto", gap: "20px" }}
    >
      {dummyData?.map((data, key) => (
        <VideoContainer key={key} data={data} />
      ))}
    </StyledGrid>
  )
}
