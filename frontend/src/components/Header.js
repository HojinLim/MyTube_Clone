import React, { useEffect, useState } from "react"
import { Button, IconButton } from "@mui/material"
import YoutubeLogo from "assets/images/logos/logo.png"
import SearchIcon from "@mui/icons-material/Search"
//Icons
import MicIcon from "@mui/icons-material/Mic"
import MenuIcon from "@mui/icons-material/Menu"
import InputBase from "@mui/material/InputBase"

import { GoogleLoginButton } from "./GoogleLoginButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"

import { UserProfileButton } from "./UserProfileButton"
import { accountState } from "atom/accountState"
import Divider from "@mui/material/Divider"
import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import AddVideoMenu from "./Video/AddVideoMenu"
import NotificationMenu from "./Notification/NotificationMenu"
import MicModal from "./Search/MicModal"
import useMediaQuery from "@mui/material/useMediaQuery"
function Header() {
  const [user, setUser] = useRecoilState(accountState)
  const matches = useMediaQuery("(min-width:650px)")
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
        // paddingBottom: "50px",
      }}
    >
      {/* 좌측 */}

      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto" }}>
          <SideBar />
        </div>

        <img
          className="logo"
          onClick={() => navigate("/")}
          src={YoutubeLogo}
          alt="Youtube"
          width="100"
          height="50"
        />
      </div>
      {/* 중앙 */}
      {matches && (
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
          <MicModal />
        </div>
      )}

      {/* 우측 */}
      <div style={{ margin: "0px 5px", display: "flex" }}>
        <AddVideoMenu />
        <NotificationMenu />
        {!user ? <GoogleLoginButton /> : <UserProfileButton />}
      </div>
    </div>
  )
}

export default Header
