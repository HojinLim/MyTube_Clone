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
import ArchiveIcon from "@mui/icons-material/Archive"
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { flex_column } from "styles/globalStyle"

import MultilineTextField from "components/common/MultilineTextField"
import CustomMenu from "components/common/CustomMenu"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { dummyData } from "dummy"
import { formatTime } from "functions/formatTime"

export const AfterUploadContainer = ({
  uploadedFile,
  handleIsChangeHandler,
  handleThumbChange,
  handleTextChange,
  handleContentsChange,
  upload,
  uploadedThumb,
  isPublic,
  inputText,
  inputContents,
  handleSetDuration,
}) => {
  const { size, name, type } = uploadedFile
  const videoRef = React.useRef(null)

  // useRef를 이용해 input태그에 접근
  const thumbInput = React.useRef()

  const thumbUploadHandler = () => {
    thumbInput.current.click()
  }

  // TODO: 방법1. 일단 strapi 에 올린 영상 링크화해서 붙여놓고 계산
  // 방법2 . 임시로 링크화 시킬수 있으면 그렇게 ㄱ
  React.useEffect(() => {
    // 비디오 요소가 준비되면 이벤트를 추가합니다.
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", function () {
        console.log(videoRef.current.duration)
        console.log(formatTime(videoRef?.current.duration))
      })
    }

    // 컴포넌트가 언마운트될 때 이벤트를 제거합니다.
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", function () {
          console.log(videoRef.current.duration)
        })
      }
    }
  }, []) // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Divider />
      <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight={800}>
        세부정보
      </Typography>
      <div>크기: {size}</div>
      <div>이름: {name}</div>
      <div>타입: {type}</div>
      <video
        ref={videoRef}
        width="560"
        height="315"
        src={dummyData[0].sources[0]}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        controls
      ></video>
      <MultilineTextField
        label={"제목(필수 항목)"}
        initialText={inputText}
        onTextChange={handleTextChange}
      />
      <MultilineTextField
        label={"설명"}
        initialText={inputContents}
        onTextChange={handleContentsChange}
      />
      <MultilineTextField
        label={"영상 길이"}
        // initialText={inputContents}
        onTextChange={handleSetDuration}
      />
      <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
        공개 여부
      </Typography>
      <FormControl component="fieldset">
        {/* <FormLabel id="demo-row-radio-buttons-group-label">공개여부</FormLabel> */}
        <RadioGroup
          value={isPublic}
          onChange={handleIsChangeHandler}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel value="true" control={<Radio />} label="공개" />
          <FormControlLabel value="false" control={<Radio />} label="비공개" />
        </RadioGroup>
      </FormControl>
      <div
        style={{
          display: "flex",

          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
          카테고리
        </Typography>
        <CustomIconMenu
          iconButton={<ArrowDropDownIcon />}
          menuItems={[
            { text: "movie", onClick: () => {} },
            { text: "game", onClick: () => {} },
            { text: "anime", onClick: () => {} },
            { text: "music", onClick: () => {} },
          ]}
        />
        <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
          썸네일
        </Typography>

        <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
          동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의 시선을 사로잡을 만한
          이미지를 사용해 보세요.
        </Typography>
        <input
          ref={thumbInput}
          type="file"
          style={{ display: "none" }}
          onChange={handleThumbChange}
        />
        <div className="thum-container" onClick={thumbUploadHandler}>
          {!uploadedThumb ? (
            <AddPhotoAlternateOutlinedIcon />
          ) : (
            <img
              src={uploadedThumb}
              alt="Preview"
              style={{ maxWidth: "130px", maxHeight: "70px", objectFit: "cover" }}
            />
          )}
        </div>
      </div>

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
          onClick={upload}
        >
          업로드
        </Button>
      </div>
    </div>
  )
}
