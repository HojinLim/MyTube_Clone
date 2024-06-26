import React, { useEffect, useState } from "react"
import { Button, IconButton } from "@mui/material"
import YoutubeLogo from "assets/images/logos/logo.png"
import SearchIcon from "@mui/icons-material/Search"
//Icons
import MicIcon from "@mui/icons-material/Mic"
import MenuIcon from "@mui/icons-material/Menu"
import InputBase from "@mui/material/InputBase"

import { GoogleLoginButton } from "../GoogleLoginButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"

import { UserProfileButton } from "../UserProfileButton"
import { accountState } from "atom/accountState"
import Divider from "@mui/material/Divider"
import { useNavigate } from "react-router-dom"
import SideBar from "../SideBar"
import AddVideoMenu from "../Video/AddVideoMenu"
import NotificationMenu from "../Notification/NotificationMenu"
import MicModal from "../Search/MicModal"
import useMediaQuery from "@mui/material/useMediaQuery"
import { MenuSelector } from "./MenuSelector"

import { useLocation } from "react-router-dom"

function Header() {
  const [searchText, setSearchText] = useState("")
  const [user, setUser] = useRecoilState(accountState)

  const matches = useMediaQuery("(min-width:650px)")
  const navigate = useNavigate()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"), null))
  }, [])

  const location = useLocation()

  useEffect(() => {}, [location])

  return (
    //  헤더 컨테이너
    <header
      id="container"
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        height: "46px",
        left: 0,
        right: 0,
        top: 0,
        padding: "5px 0px",
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
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
              }}
            />
            <Divider orientation="vertical" flexItem />
            <IconButton
              aria-label="logo"
              onClick={() => {
                // navigate(`/search/${searchText}`)
                window.location.href = `/search/${searchText}`
                setSearchText("")
              }}
            >
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
      {/* 카테고리 헤더 */}
      <div
        style={{
          position: "fixed",
          zIndex: 2,
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          alignItems: "center",
          left: 0,
          right: 0,
          top: "3.5rem",
          padding: "0px 25px",
          // margin: "15px 0px",
        }}
      >
        {location.pathname === "/" && (
          <MenuSelector categories={["전체", "게임", "영화", "음악", "애니메이션"]} />
        )}
      </div>
    </header>
  )
}

export default Header
