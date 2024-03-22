import React from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import person from "assets/images/person.png"
import { Button } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { openUploadState } from "atom/openUploadState"

export const DashboardItem = () => {
  const setOpen = useSetRecoilState(openUploadState)
  return (
    <div style={{ backgroundColor: "#eee", flex: "1" }}>
      <Typography variant="h5" fontWeight={"700"}>
        채널 대시보드
      </Typography>
      <Box
        style={{
          width: "370px",
          height: "650px",
          border: "1px solid lightgray",
          borderRadius: "5px",
          padding: "10px",
          margin: "15px",
          backgroundColor: "white",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            border: "1px dotted lightgray",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <img src={person} width={"200px"} style={{ alignSelf: "center" }} />
          <Typography variant="body1" style={{ textAlign: "center" }}>
            최근 동영상의 측정항목을 보고 싶으신가요? 시작하려면 동영상을 업로드하고 게시하세요.
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            style={{
              backgroundColor: "#026be3",
              color: "white",
              width: "40%",
              margin: "15px 0px",
              alignSelf: "center",
            }}
          >
            동영상 업로드
          </Button>
        </Box>
      </Box>
    </div>
  )
}
