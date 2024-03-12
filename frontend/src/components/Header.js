import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import YoutubeLogo from "assets/images/logos/logo.png"
import SearchIcon from "@mui/icons-material/Search"
import MicIcon from "@mui/icons-material/Mic"

import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import { GoogleLoginButton } from "./GoogleLoginButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"

import { UserProfileButton } from "./UserProfileButton"
import { accountState } from "atom/accountState"
import Divider from "@mui/material/Divider"
import { useNavigate } from "react-router-dom"

function Header() {
  const [state, toggleState] = useRecoilState(changeState)
  const [user, setUser] = useRecoilState(accountState)

  const navigate = useNavigate()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"), null))
  }, [])

  return (
    <div
      id="container"
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        height: "10vh",
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      {/* 좌측 */}

      <div style={{ display: "flex" }}>
        <Button
          sx={{ borderRadius: "50%" }}
          onClick={() => {
            toggleState((prev) => !prev)
          }}
        >
          <MenuIcon />
        </Button>
        <Button
          aria-label="logo"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          onClick={() => navigate("/")}
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
