import React, { useEffect, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import DashboardIcon from "@mui/icons-material/Dashboard"
import emailjs from "@emailjs/browser"
import MenuIcon from "@mui/icons-material/Menu"
import YoutubeLogo from "assets/images/logos/youtube-studio-logo.jpg"
import Avatar from "@mui/material/Avatar"
import { IconButton, Button, InputBase } from "@mui/material"
// icons
import UploadIcon from "@mui/icons-material/Upload"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import SearchIcon from "@mui/icons-material/Search"
import { UserProfileButton } from "components/UserProfileButton"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { CustomButtonWithBox } from "components/common/CustomButtonWithBox"
import { useSetRecoilState } from "recoil"
import { openUploadState } from "atom/openUploadState"
export const StudioHeader = () => {
  const setOpenUpload = useSetRecoilState(openUploadState)
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
        height: "52px",
        left: 0,
        right: 0,
        top: 0,
        padding: "10px 0px",

        borderBottom: "3px solid #eee",
        // placeItems: "center",
      }}
    >
      {/* 좌측 */}
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto" }}>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </div>

        <img
          className="logo"
          // onClick={() => navigate("/")}
          src={YoutubeLogo}
          alt="Youtube"
          width="90"
          height="90"
          style={{ objectFit: "contain", overflow: "auto" }}
        />
      </div>
      {/* 중앙 */}
      <div style={{ width: "40%" }}>
        <div
          id="center-container"
          style={{
            border: "1px lightgray solid",
            borderRadius: "5px",
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
            placeholder="채널에서 검색하기"
            inputProps={{ "aria-label": "search" }}
            style={{ width: "100%", fontWeight: "700" }}
          />
        </div>
      </div>

      {/* 우측 */}

      <div
        style={{
          display: "flex",
          placeItems: "center",
          width: "30%",
          justifyContent: "end",
          maxWidth: "150px",
        }}
      >
        <CustomButtonWithBox
          buttonStyle={{
            height: "100%",
            maxHeight: "40px",
            margin: "10px 0px",
            border: "1px solid #eee",
          }}
          text="만들기"
          onClick={() => {}}
          menuItems={[
            {
              icon: <UploadIcon />,
              text: "동영상 업로드",
              onClick: () => {
                setOpenUpload(true)
              },
            },
            { icon: <DriveFileRenameOutlineIcon />, text: "게시물 작성", onClick: () => {} },
            { icon: <PlaylistAddIcon />, text: "새 재생목록", onClick: () => {} },
          ]}
          icon={<VideoCallOutlinedIcon style={{ color: "red" }} />}
        />

        <UserProfileButton />
      </div>
    </div>
  )
}
