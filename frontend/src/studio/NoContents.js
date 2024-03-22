import React, { useState } from "react"
import { Typography } from "@mui/material"
import person from "assets/images/person.png"
import { Button } from "@mui/material"

export const NoContents = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={person} width={"200px"} style={{}} />
      <Typography variant="body1" style={{ textAlign: "center" }}>
        콘텐츠가 없습니다.
      </Typography>
      <Button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#026be3",
          color: "white",
          width: "150px",
          margin: "15px 0px",
          alignSelf: "center",
        }}
      >
        동영상 업로드
      </Button>
    </div>
  )
}
