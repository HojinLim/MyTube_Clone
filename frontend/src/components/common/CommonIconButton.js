import React from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
export const CommonIconButton = ({ onClick, background, color, icon }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      style={{
        backgroundColor: background ?? "#eee",
        borderRadius: "100px",
        height: "40px",
        width: "40px",
        color: color ?? "black",
      }}
    >
      {icon}
    </IconButton>
  )
}
