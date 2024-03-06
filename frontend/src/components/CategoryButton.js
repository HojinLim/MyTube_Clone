import React, { useState } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"

const CATEGORY = ["전체", "음악", "게임", "스포츠", "뉴스", "엔터테인먼트", "라이브"]
export const CategoryButton = () => {
  const [selectedButton, setSelectedButton] = useState("전체")

  const ClickedStyle = {
    backgroundColor: "black",
    color: "white",
    margin: "5px",
  }
  return (
    <Box
      position={"fixed"}
      style={{ marginLeft: "15vw", marginTop: "-5vh", backgroundColor: "gray", zIndex: 2 }}
    >
      <Grid container justifyContent="center">
        <Grid item>
          {CATEGORY.map((category, key) => (
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
    </Box>
  )
}
