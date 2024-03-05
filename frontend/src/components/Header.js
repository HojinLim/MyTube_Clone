import React from "react"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import YoutubeLogo from "assets/images/logos/logo.jpg"
import SearchIcon from "@mui/icons-material/Search"
import MicIcon from "@mui/icons-material/Mic"

import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import { LoginButton } from "./LoginButton"
import CategoryHeader from "./CategoryHeader"

const StyledIconButton = styled(IconButton)({
  backgroundColor: "lightgray",
  borderRadius: "50%",
  padding: "10px", // 아이콘 주위 여백 조절
})

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))
function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* 왼쪽에 위치할 요소들 */}
        <div>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton aria-label="logo">
            <img src={YoutubeLogo} alt="Youtube" width="100" height="50" />
          </IconButton>
        </div>

        {/* 가운데에 위치할 요소 */}
        <div style={{ flexDirection: "row", display: "flex" }}>
          <Search sx={{ borderRadius: "20px", borderColor: "black", borderWidth: "2px" }}>
            <StyledInputBase placeholder="검색" inputProps={{ "aria-label": "search" }} />
            <IconButton aria-label="logo">
              <SearchIcon />
            </IconButton>
          </Search>
          <StyledIconButton aria-label="mic">
            <MicIcon />
          </StyledIconButton>
        </div>

        {/* 오른쪽에 위치할 요소들 */}
        <div>
          {/* 비로그인 */}
          <LoginButton />

          {/* 로그인 시 */}
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 38, height: 38 }} /> */}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header