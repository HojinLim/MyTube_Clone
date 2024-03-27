import * as React from "react"
import Box from "@mui/material/Box"
import { Button, IconButton } from "@mui/material"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
// Icon
import CloseIcon from "@mui/icons-material/Close"
import UploadIcon from "@mui/icons-material/Upload"

// global state
import { useRecoilState } from "recoil"

import { openUploadState } from "atom/openUploadState"
import { flex_space_between } from "styles/globalStyle"
import { flex_column } from "styles/globalStyle"
import { createUser } from "apollo/mutation"
import { STRAPI_TOKEN } from "Constants/value"
import axios from "axios"
import { useMutation } from "@apollo/client"
import { UPLOAD_VIDEO } from "apollo/mutation"

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
  const [uploadVideo, { uploadData, uploadLoading, uploadError }] = useMutation(UPLOAD_VIDEO)
  const [uploaded, setUploaded] = React.useState(false)
  const [modalTitle, setModalTitle] = React.useState("동영상 업로드")
  const [uploadedFile, setUploadedFile] = React.useState(null)
  const [open, setOpen] = useRecoilState(openUploadState)
  const [isPublic, setIsPublic] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const fileUploadHandler = () => {
    imageInput.current.click()
  }

  // useRef를 이용해 input태그에 접근
  const imageInput = React.useRef()

  const handleChange = (e) => {
    const data = e.target.files[0]
    console.log(data)
    if (data !== null) {
      setUploadedFile(data)
      setModalTitle(data.name)
      setUploaded(true)
    } else {
      alert("잘못된 데이터 형식입니다!!!!")
    }
  }

  function upload() {
    console.log(uploadedFile)
    return new Promise((resolve, reject) => {
      var formData = new FormData()
      formData.append("files", uploadedFile)
      // let config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "Bearer " + localStorage.getItem(STRAPI_TOKEN),
      //   },
      // }
      axios
        .post(process.env.REACT_APP_BACKEND_URL_UPLOAD + "/upload", formData)
        .then((data) => {
          console.log(data)
          uploadVideoToStrapi(data)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  function uploadVideoToStrapi({ data }) {
    const { name, id } = data[0]
    uploadVideo({
      variables: {
        title: name,
        description: "This is Test",
        createdBy: "hojinim@gmail.com",
        contents: id,
        isPublic: isPublic,
      },
    })
      .then((res) => console.log(res))
      .catch((res) => {
        console.log(res)
      })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={flex_space_between}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div style={flex_column}>
            {!uploaded ? (
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
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 1, color: "gray" }}
                    variant="caption"
                  >
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
                  <input
                    ref={imageInput}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </div>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1, position: "absolute", bottom: "15px", margin: "15px" }}
                >
                  YouTube에 동영상을 제출하면 YouTube 서비스 약관 및 커뮤니티 가이드에 동의하게
                  됩니다. 불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다.
                  타인의 저작권 또는 개인 정보 보호 권리를 침해해서는 안 됩니다. 자세히 알아보기
                </Typography>
              </>
            ) : (
              <>
                <div>크기: {uploadedFile.size}</div>
                <div>이름: {uploadedFile.name}</div>
                <div>타입: {uploadedFile.type}</div>

                <FormControl component="fieldset">
                  <FormLabel id="demo-row-radio-buttons-group-label">공개여부</FormLabel>
                  <RadioGroup
                    value={isPublic}
                    onChange={(e) => setIsPublic(e.target.value === "true" ? true : false)}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="true" control={<Radio />} label="공개" />
                    <FormControlLabel value="false" control={<Radio />} label="비공개" />
                  </RadioGroup>
                </FormControl>

                <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
                  <Divider />

                  <Button
                    style={{ ...flex_column }}
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "#146ffa",
                      color: "white",
                      width: "100px",
                      alignSelf: "center",
                    }}
                    onClick={() => upload()}
                  >
                    업로드
                  </Button>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
