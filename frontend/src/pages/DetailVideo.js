import * as React from "react"
import Grid from "@mui/material/Grid"
import useMediaQuery from "@mui/material/useMediaQuery"

export const DetailVideo = () => {
  const matches = useMediaQuery("(min-width:1024px)")

  const gridContainer = {
    display: "grid",
    marginTop: "100px",
  }

  return (
    <div className="detail_container">
      <div className="left_container">
        <div className="left_item_1"> </div>
        <div className="left_item_2"> </div>
        <div className="left_item_3"> </div>
      </div>
      <div className="right_container"></div>
    </div>
  )
}
