import React from "react"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import SortIcon from "@mui/icons-material/Sort"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { VideoContainer } from "components/common/VideoContainer"
import { StyledGrid } from "styles/globalStyle"
import { dummyData } from "dummy"
export const PlayListContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px" }}>
        <Typography variant="body1">생성된 재생목록</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SortIcon />
          정렬 기준
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem>추가된 날짜(최신순)</MenuItem>
          <MenuItem onClick={handleClose}>최근 추가된 동영상순</MenuItem>
        </Menu>
      </div>
      <StyledGrid>
        <VideoContainer data={dummyData[0]} hasCreator={false} />
        <VideoContainer data={dummyData[0]} hasCreator={false} />
        <VideoContainer data={dummyData[0]} hasCreator={false} />
      </StyledGrid>
    </div>
  )
}
