import React, { useState } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import { useSetRecoilState } from "recoil"
import { menuState } from "atom/menuState"

export const MenuSelector = (props) => {
  const { categories, setState } = props
  const [selectedButton, setSelectedButton] = useState(categories[0])
  const setMenu = useSetRecoilState(menuState)
  const ClickedStyle = {
    backgroundColor: "black",
    color: "white",
    margin: "3px",
  }
  const menuHandler = (category) => {
    if (setState) setState(category)
    setSelectedButton(category)

    switch (category) {
      case "전체":
        setMenu("all")
        break
      case "게임":
        setMenu("game")
        break
      case "음악":
        setMenu("music")
        break
      case "영화":
        setMenu("movie")
        break
      case "애니메이션":
        setMenu("anime")
        break
    }
  }

  return (
    <Grid container justifyContent="left">
      <Grid item>
        {categories.map((category, key) => (
          <Tooltip key={key} title={category} placement="top-start">
            <Button
              size="small"
              onClick={() => menuHandler(category)}
              style={
                selectedButton === category
                  ? ClickedStyle
                  : { backgroundColor: "lightgray", color: "black", margin: "3px" }
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
