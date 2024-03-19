import React, { useState } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"

export const MenuSelector = ({ categories }) => {
  const [selectedButton, setSelectedButton] = useState(categories[0])
  const ClickedStyle = {
    backgroundColor: "black",
    color: "white",
    margin: "5px",
  }

  return (
    <Grid container justifyContent="left">
      <Grid item>
        {categories.map((category, key) => (
          <Tooltip key={key} title={category} placement="top-start">
            <Button
              onClick={() => setSelectedButton(category)}
              style={
                selectedButton === category
                  ? ClickedStyle
                  : { backgroundColor: "lightgray", color: "black", margin: "5px" }
              }
            >
              {category}
            </Button>
          </Tooltip>
        ))}
      </Grid>
    </Grid>
  )
}
