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
import { CustomIconMenu } from "components/common/CustomIconMenu"
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
  duration,
  handleSort,
  sort,
}) => {
  const { size, name, type } = uploadedFile
  const videoRef = React.useRef(null)
  const textRef = React.useRef(null)
  const [isShorts, setIsShorts] = React.useState(false)

  // useRef를 이용해 input태그에 접근
  const thumbInput = React.useRef()

  const thumbUploadHandler = () => {
    thumbInput.current.click()
  }

  React.useEffect(() => {
    // 비디오 요소가 준비되면 이벤트를 추가합니다.
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", function () {
        console.log(formatTime(videoRef?.current.duration))
        const duration = formatTime(videoRef?.current.duration)
        handleSetDuration(duration)

        if (videoRef?.current.duration < 30) {
          handleSort("shorts")
          setIsShorts(true)
        }
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
      <div style={{ display: "flex" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            marginRight: "250px",
          }}
        >
          <li>크기: {size}</li>
          <li>타입: {type}</li>
          <li>이름: {name}</li>
          <li>시간: {duration}</li>
        </ul>
        {/* 미리보기 영상 */}

        <video
          ref={videoRef}
          width="360"
          height="215"
          src={URL.createObjectURL(uploadedFile)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          controls
        ></video>
      </div>
      <MultilineTextField
        ref={textRef}
        label={"제목(필수 항목)"}
        initialText={inputText}
        onTextChange={handleTextChange}
      />
      <MultilineTextField
        label={"설명"}
        initialText={inputContents}
        onTextChange={handleContentsChange}
      />

      <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
        공개 여부
      </Typography>
      <FormControl component="fieldset">
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
        <div style={{ display: "flex" }}>
          <Typography id="modal-modal-description" fontSize={"15px"} sx={{ mt: 1 }}>
            카테고리
          </Typography>
          {!isShorts && (
            <CustomIconMenu
              iconButton={<ArrowDropDownIcon />}
              menuItems={[
                { text: "movie", onClick: () => handleSort("movie") },
                { text: "game", onClick: () => handleSort("game") },
                { text: "anime", onClick: () => handleSort("anime") },
                { text: "music", onClick: () => handleSort("music") },
              ]}
            />
          )}

          <Typography
            fontSize={"15px"}
            sx={{ mt: 1, borderBottom: "1px solid black", ...(isShorts && { marginLeft: "10px" }) }}
          >
            {sort}
          </Typography>
        </div>

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
          accept="image/*"
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
