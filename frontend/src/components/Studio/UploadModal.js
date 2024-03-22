import * as React from "react"
import Box from "@mui/material/Box"
import { Button, IconButton } from "@mui/material"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"

// Icon
import CloseIcon from "@mui/icons-material/Close"
import UploadIcon from "@mui/icons-material/Upload"

// global state
import { useRecoilState } from "recoil"

import { openUploadState } from "atom/openUploadState"
import { flex_space_between } from "styles/globalStyle"
import { flex_column } from "styles/globalStyle"

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
}

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(openUploadState)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={flex_space_between}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              동영상 업로드
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />

          <div style={flex_column}>
            <div style={{ ...flex_column, marginTop: "200px" }}>
              <IconButton
                sx={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "lightgray",
                  alignSelf: "center",
                }}
              >
                <UploadIcon sx={{ width: "60px", height: "60px" }} />
              </IconButton>
              <Typography id="modal-modal-description" fontSize={"20px"} sx={{ mt: 1 }}>
                동영상 파일을 드래그 앤 드롭하여 업로드
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 1, color: "gray" }}
                variant="caption"
              >
                동영상을 게시하기 전에는 비공개로 설정됩니다.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#146ffa",
                  color: "white",
                  width: "100px",
                  alignSelf: "center",
                }}
              >
                파일 선택
              </Button>
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, position: "absolute", bottom: "15px", margin: "15px" }}
            >
              YouTube에 동영상을 제출하면 YouTube 서비스 약관 및 커뮤니티 가이드에 동의하게 됩니다.
              불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다. 타인의 저작권
              또는 개인 정보 보호 권리를 침해해서는 안 됩니다. 자세히 알아보기
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
