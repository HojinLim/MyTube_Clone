import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"

import Divider from "@mui/material/Divider"

import CloseIcon from "@mui/icons-material/Close"

import { CommonIconButton } from "components/common/CommonIconButton"
import { ShortsDesItem } from "./ShortsDesItem"

export const ShortsDesContainer = (props) => {
  const { setDesMode, openComment, setOpenComment } = props

  return (
    <div
      style={{
        scrollSnapAlign: "start",
        width: "400px",
        height: "700px",
        border: "1px solid #e0e0e0",
        borderRadius: "15px",
        objectFit: "cover",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Typography variant="h6" fontWeight={"600"}>
              설명
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <CommonIconButton
              onClick={() => {
                if (openComment) setOpenComment(false)
                setDesMode(false)
              }}
              background={"#00ff0000"}
              color={"gray"}
              icon={<CloseIcon />}
            />
          </div>
        </div>
        <Typography style={{ marginBottom: "10px", marginLeft: "10px" }} variant="body1">
          제목
        </Typography>

        <Divider />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <ShortsDesItem above="9천" bottom="좋아요 수" />
        <ShortsDesItem above="373,553" bottom="조회수" />
        <ShortsDesItem above="4월 19일" bottom="2024년" />
      </div>
    </div>
  )
}
