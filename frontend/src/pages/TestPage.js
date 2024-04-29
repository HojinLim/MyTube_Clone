import { useMediaQuery } from "@mui/material"
import React from "react"

export const TestPage = () => {
  const matches = useMediaQuery("(min-width:650px)")
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div
        className="later_outer"
        style={
          {
            // backgroundColor: color && rgbToHex(color?.r, color?.g, color?.b),
          }
        }
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "blue",
            height: "100%",
            display: "flex",
            borderRadius: "25px",
            marginBottom: "120px",
            width: "100%",
            overflow: "scroll",
          }}
        >
          dd
        </div>
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          width: "100%",
          backgroundColor: "peru",
          height: "100%",
        }}
      >
        ss
      </div>
    </div>
  )
}
