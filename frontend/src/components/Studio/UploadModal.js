import * as React from "react"
import Box from "@mui/material/Box"
import { IconButton } from "@mui/material"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"

// Icon
import CloseIcon from "@mui/icons-material/Close"

// global state
import { useRecoilState } from "recoil"

import { openUploadState } from "atom/openUploadState"
import { flex_space_between } from "styles/globalStyle"
import { flex_column } from "styles/globalStyle"

import axios from "axios"
import { useMutation, useQuery } from "@apollo/client"
import { UPLOAD_VIDEO } from "apollo/mutation"

import { BeforeUploadContainer } from "./BeforeUploadContainer"
import { AfterUploadContainer } from "./AfterUploadContainer"
import { USER_INFO } from "Constants/value"

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
  const [uploadThumbImage, setUploadThumbImage] = React.useState(null)
  const [uploadedThumb, setUploadedThumb] = React.useState(null)
  const [open, setOpen] = useRecoilState(openUploadState)
  const [isPublic, setIsPublic] = React.useState(false)
  const [duration, setDuration] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 제목 입력
  const [inputText, setInputText] = React.useState()
  const handleTextChange = (newText) => {
    setInputText(newText) // 자식 컴포넌트에서 전달된 텍스트 값을 받음
  }
  const [inputContents, setInputContents] = React.useState()
  const handleContentsChange = (newText) => {
    setInputContents(newText) // 자식 컴포넌트에서 전달된 텍스트 값을 받음
  }

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
  const handleIsChangeHandler = (e) => {
    setIsPublic(e.target.value === "true" ? true : false)
  }

  const handleThumbChange = (e) => {
    const data = e.target.files[0]

    if (data) {
      // strapi 사진 올리기용
      setUploadThumbImage(data)

      //base64 넣기(img에 넣을 미리보기용)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedThumb(reader.result)
      }
      reader.readAsDataURL(data)
    }
  }
  function handleSetDuration(e) {
    if (e.target) {
      setDuration(e.target.value)
    }
  }

  function upload() {
    console.log(uploadedFile)
    return new Promise((resolve, reject) => {
      if (!uploadThumbImage) {
        alert("썸네일이 비어있습니다!!")
        return
      } else if (!inputText) {
        alert("제목이 비어있습니다!!")
        return
      }
      var formData = new FormData()
      formData.append("files", uploadedFile)
      formData.append("files", uploadThumbImage)

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
  // strapi 올라갈 데이터

  function uploadVideoToStrapi({ data }) {
    const user = JSON.parse(localStorage.getItem(USER_INFO))
    console.log(data)
    // 0- 동영상 1- 썸네일
    const { name, id: videoID } = data[0]
    const { id: thumbID } = data[1]
    uploadVideo({
      variables: {
        title: inputText,
        description: inputText,
        createdBy: user.name,
        contents: videoID,
        thumbnail: thumbID,
        isPublic: isPublic,
        duration: duration + "",
      },
    })
      .then((res) => {
        console.log("uploaded in strapi", res)
        alert("업로드 성공!")
        location.href = location.href
      })
      .catch((res) => {
        console.log(res)
      })
      .finally((res) => {
        // setUploaded(false)
        // handleClose()
        // setUploadedFile(null)
        // setUploadThumbImage(null)
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
              <BeforeUploadContainer handleChange={handleChange} />
            ) : (
              <AfterUploadContainer
                uploadedFile={uploadedFile}
                handleIsChangeHandler={handleIsChangeHandler}
                handleThumbChange={handleThumbChange}
                handleTextChange={handleTextChange}
                handleContentsChange={handleContentsChange}
                upload={upload}
                uploadedThumb={uploadedThumb}
                isPublic={isPublic}
                inputText={inputText}
                inputContents={inputContents}
                handleSetDuration={handleSetDuration}
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
