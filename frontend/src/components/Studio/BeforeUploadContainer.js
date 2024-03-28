import * as React from "react"

import { Button, IconButton } from "@mui/material"
import Typography from "@mui/material/Typography"

// Icon

import UploadIcon from "@mui/icons-material/Upload"

import { flex_column } from "styles/globalStyle"

export const BeforeUploadContainer = ({ handleChange }) => {
  const fileUploadHandler = () => {
    imageInput.current.click()
  }

  // useRef를 이용해 input태그에 접근
  const imageInput = React.useRef()

  return (
    <>
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
        <Typography id="modal-modal-description" sx={{ mt: 1, color: "gray" }} variant="caption">
          동영상을 게시하기 전에는 비공개로 설정됩니다.
        </Typography>
        <Button
          onClick={fileUploadHandler}
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
        {/* 파일 업로드 태그 */}
        <input ref={imageInput} type="file" style={{ display: "none" }} onChange={handleChange} />
      </div>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 1, position: "absolute", bottom: "15px", margin: "15px" }}
      >
        YouTube에 동영상을 제출하면 YouTube 서비스 약관 및 커뮤니티 가이드에 동의하게 됩니다.
        불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다. 타인의 저작권 또는
        개인 정보 보호 권리를 침해해서는 안 됩니다. 자세히 알아보기
      </Typography>
    </>
  )
}
