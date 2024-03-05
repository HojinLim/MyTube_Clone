import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
export const ToggleCategoryButton = () => {
  const [alignment, setAlignment] = React.useState("web")

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  const StyledIconButton = styled(Button)({
    backgroundColor: "lightgray",
    borderRadius: "15%",
    padding: "10px", // 아이콘 주위 여백 조절
    color: "black",
  })

  return (
    <Box sx={{ width: 500 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="Add" placement="top-start">
            <StyledIconButton>top-start</StyledIconButton>
          </Tooltip>
          <Tooltip title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  )
}
