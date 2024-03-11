import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import YoutubeLogo from "assets/images/logos/logo.png"
import SearchIcon from "@mui/icons-material/Search"
import MicIcon from "@mui/icons-material/Mic"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import { GoogleLoginButton } from "./GoogleLoginButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"
import useMediaQuery from "@mui/material/useMediaQuery"
import MenuItem from "@mui/material/MenuItem"
import { UserProfileButton } from "./UserProfileButton"
import { accountState } from "atom/accountState"
import Divider from "@mui/material/Divider"
const StyledIconButton = styled(IconButton)({
  backgroundColor: "lightgray",
  borderRadius: "50%",
  padding: "10px", // 아이콘 주위 여백 조절
})

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",

//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(1)})`,
//     transition: theme.transitions.create("width"),
//     width: "500px",
//   },
// }))

function Header() {
  const [state, toggleState] = useRecoilState(changeState)
  const [user, setUser] = useRecoilState(accountState)
  const matches = useMediaQuery("(min-width:768px)")
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"), null))
  }, [])

  return (
    <div
      id="container"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      {/* 좌측 */}

      <div style={{ display: "flex" }}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Button
          aria-label="logo"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <img src={YoutubeLogo} alt="Youtube" width="100" height="50" />
        </Button>
      </div>
      {/* 중앙 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          id="center-container"
          style={{
            border: "1px lightgray solid",
            borderRadius: "20px",
            borderWidth: "2px",
            width: "40vw",
            display: "flex",
            justifyContent: "space-between",
            padding: "1px",
          }}
        >
          <IconButton aria-label="logo">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="검색"
            inputProps={{ "aria-label": "search" }}
            style={{ width: "100%" }}
          />

          <Divider orientation="vertical" flexItem />
          <IconButton aria-label="logo">
            <SearchIcon />
          </IconButton>
        </div>
        <IconButton aria-label="logo" sx={{ backgroundColor: "lightgray", marginLeft: "10px" }}>
          <MicIcon />
        </IconButton>
      </div>
      {/* 우측 */}
      <div>{!user ? <GoogleLoginButton /> : <UserProfileButton />}</div>
    </div>
  )
}

export default Header
