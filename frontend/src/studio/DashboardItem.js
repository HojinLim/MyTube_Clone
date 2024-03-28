import React from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import person from "assets/images/person.png"
import { Button } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { openUploadState } from "atom/openUploadState"
import Divider from "@mui/material/Divider"

export const DashboardItem = () => {
  const setOpen = useSetRecoilState(openUploadState)
  return (
    <div style={{ backgroundColor: "#eee", flex: "1", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" fontWeight={"700"} style={{ marginTop: "23px", marginLeft: "32px" }}>
        채널 대시보드
      </Typography>
      <div style={{ display: "flex" }}>
        <Box
          style={{
            width: "300px",
            height: "600px",
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

        <Box
          style={{
            width: "270px",
            height: "500px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            padding: "15px",
            margin: "15px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6">채널 분석</Typography>
          <Typography variant="body1" marginTop={"10px"} marginBottom={"5px"}>
            현재 구독자 수
          </Typography>
          <Typography variant="h4" style={{ marginBottom: "60px" }}>
            00명
          </Typography>
          <Divider />
          <div style={{ marginTop: "15px", marginBottom: "25px" }}>
            <Typography variant="body1">요약</Typography>
            <Typography variant="body1">지난 00일</Typography>

            <Typography variant="body1">조회수</Typography>
            <Typography variant="body1">00회</Typography>
            <Typography variant="body1">시청시간(단위:시간)</Typography>
            <Typography variant="body1">0.0</Typography>
          </div>

          <Divider />
        </Box>
      </div>
    </div>
  )
}
