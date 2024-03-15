import React, { useState } from "react"
import { Typography } from "@mui/material"
import person from "assets/images/person.png"
import { Button } from "@mui/material"

export const NoContents = () => {
  return (
    <>
      <img src={person} width={"200px"} style={{ alignSelf: "center" }} />
      <Typography variant="body1" style={{ textAlign: "center" }}>
        콘텐츠가 없습니다.
      </Typography>
      <Button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#026be3",
          color: "white",
          width: "15%",
          margin: "15px 0px",
          alignSelf: "center",
        }}
      >
        동영상 업로드
      </Button>
    </>
  )
}
