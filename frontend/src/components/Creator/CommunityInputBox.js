import React, { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import { Typography, Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"
import { CommonIconButton } from "components/common/CommonIconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import CloseIcon from "@mui/icons-material/Close"
import { useMutation } from "@apollo/client"
import { CREATE_POST } from "apollo/mutation"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"

export const CommunityInputBox = (props) => {
  // 이미지 드래그 다운
  const [isActive, setActive] = useState(false)
  const handleDragStart = () => setActive(true)
  const handleDragEnd = () => setActive(false)

  const { refetch } = props
  const [openImage, setOpenImage] = useState(false)
  const imageInput = useRef(null)
  const [uploadThumbImage, setUploadThumbImage] = useState(null)
  const [uploadedThumb, setUploadedThumb] = useState(null)
  const [uploadPost] = useMutation(CREATE_POST)
  const user = useRecoilValue(accountState)
  const [text, setText] = useState("")

  const handleDrop = (event) => {
    event.preventDefault()

    const file = event.dataTransfer.files[0]
    console.log(event.dataTransfer.files)
    console.log(file)
    // readImage(file)
    setActive(false)

    onChangeThumb(file)

    // 드롭된 파일 핸들링
    // ...
  }
  const onChangeThumb = (file) => {
    if (file) {
      // Set the thumbnail image for preview
      setUploadThumbImage(file)

      // Read the file and set it as a preview image
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedThumb(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleThumbChange = (e) => {
    const file = e.target.files[0]
    onChangeThumb(file)
  }

  const upload = () => {
    if (!uploadThumbImage) {
      // Handle case when thumbnail image is not selected
      console.error("Thumbnail image is not selected!")
      return
    }

    // Create FormData object to append the file
    const formData = new FormData()
    formData.append("files", uploadThumbImage)
    console.log(formData)
    // Make a POST request to upload the file
    axios
      .post(process.env.REACT_APP_BACKEND_URL_UPLOAD + "/upload", formData)
      .then((response) => {
        // Handle successful upload
        console.log("File uploaded successfully:", response.data)
        uploadVideoToStrapi(response)
        // uploadPost({ variables: { created_user: "26", contents: "hi", photo: "82" } })
      })
      .catch((error) => {
        // Handle upload errors
        console.error("Error uploading file:", error)
      })
  }

  // strapi 올라갈 데이터
  function uploadVideoToStrapi({ data }) {
    console.log(data)

    const { id } = data[0]
    // const { id: thumbID } = data[1]
    console.log(data.id)
    console.log(data[0]?.id)
    uploadPost({
      variables: { created_user: user?.uid, contents: text, photo: id },
      onCompleted: () => {
        toast.success("작성 성공!")
        setText("")
        setUploadedThumb(null)
        setUploadThumbImage(null)
      },
    })
      .then((res) => {
        console.log("uploaded in strapi", res)

        // location.href = location.href
      })
      .catch((res) => {
        console.log(res)
      })
      .finally((res) => {
        props?.refetch()
      })
  }

  return (
    <div className="community-box-container">
      {/* 1 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "10%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={user.picture} />

          <div style={{ display: "flex" }}>
            <Typography style={{ marginLeft: "10px" }} variant="h6">
              {user.name}
            </Typography>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "80%",
          margin: "15px 0px",
        }}
      >
        {/* 인풋 박스 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            paddingRight: "30px",
          }}
        >
          {uploadedThumb && (
            <img
              src={uploadedThumb}
              alt="Preview"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
                alignSelf: "center",
                margin: "20px 0px",
              }}
            />
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              resize: "none", // 사용자가 크기를 조절하지 못하도록 함
              overflowY: "auto", // 세로 스크롤 표시
              border: "none",
              borderRadius: "25px",
              padding: "20px",
              marginBottom: "30px",
              borderTop: "30px",
            }}
            placeholder="무슨 생각을 가지고 계신가요?"
          />
          {openImage && (
            <div
              className={`preview${isActive ? " active" : ""}`}
              onDragEnter={handleDragStart} // dragstart 핸들러 추가
              onDragLeave={handleDragEnd}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <>
                <IconButton
                  onClick={() => setOpenImage(false)}
                  style={{
                    borderRadius: "75%",
                    position: "absolute",
                    right: 0,
                    top: 0,

                    width: "40px",
                    height: "40px",

                    color: "black",
                    border: "1px solid #eee",
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pointerEvents: "none",
                    // border: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      // border: "1px solid black",
                    }}
                  >
                    <ImageOutlinedIcon />
                    <Typography>최대 5개의 이미지 또는 GIF를 드래그하거나</Typography>
                    <div
                      onClick={() => imageInput.current.click()}
                      style={{ color: "lightblue", pointerEvents: "auto" }}
                      className="clickable"
                    >
                      컴퓨터에서 선택
                    </div>
                    <input
                      className="hidden-input"
                      ref={imageInput}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbChange}
                    />
                    <div
                      style={{
                        marginTop: "58px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">
                        가로 세로 비율이 2:5에서 5:2 사이인 이미지를 업로드하세요.
                      </Typography>
                      <Typography variant="caption">
                        사용 권한이 있는 이미지 또는 GIF만 선택하세요.
                      </Typography>
                    </div>
                  </div>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "20%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!openImage && (
            <Button style={{ borderRadius: "20px" }} onClick={() => setOpenImage(true)}>
              <ImageOutlinedIcon />
              이미지
            </Button>
          )}
          <div></div>
          <div className="flex">
            <Button onClick={() => setOpenImage(false)} style={{ borderRadius: "20px" }}>
              취소
            </Button>
            <Button onClick={upload} style={{ borderRadius: "20px" }}>
              게시
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
//
