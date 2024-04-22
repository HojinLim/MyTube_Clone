import React from "react"
import { Typography } from "@mui/material"
export const ShortsDesItem = (props) => {
  const { above, bottom } = props
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" fontWeight={"600"}>
        {above}
      </Typography>
      <Typography variant="body1" color={"gray"}>
        {bottom}
      </Typography>
    </div>
  )
}
