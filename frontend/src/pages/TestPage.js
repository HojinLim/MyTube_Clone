import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import TextField from "@mui/material/TextField"
import ShareIcon from "@mui/icons-material/Share"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CommentIcon from "@mui/icons-material/Comment"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeDownIcon from "@mui/icons-material/VolumeDown"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import SortIcon from "@mui/icons-material/Sort"
import CloseIcon from "@mui/icons-material/Close"

import PauseIcon from "@mui/icons-material/Pause"
import SvgIcon from "@mui/material/SvgIcon"
import { CommonIconButton } from "components/common/CommonIconButton"
import { dummyData } from "dummy"
import ReactPlayer from "react-player"
import Icon from "@mui/material/Icon"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
export const TestPage = () => {
  console.log(dummyData[0].sources[0])
  const [volumn, setVolumn] = useState(30)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [good, setGood] = useState(false)
  const [bad, setBad] = useState(false)
  // console.log(showVolumeControl)
  const handleChange = (event, newValue) => {
    setVolumn(newValue)
  }

  // const [volumn, setVolumn] = useState(30)
  const [onPlaying, setOnPlaying] = useState(true)
  const [hideIcon, setHideIcon] = useState(true)
  const [prevVolumn, setPrevVolumn] = useState(volumn)
  const [get, setGet] = useState(false)
  const muteHandler = () => {
    if (volumn !== 0) {
      setPrevVolumn(volumn)
    }
    setVolumn((prev) => (prev === 0 ? prevVolumn : 0))
  }
  const hideIconHandler = () => {
    setHideIcon(false)
    setTimeout(() => {
      setHideIcon(true) // onPlaying 상태 변경하여 아이콘 사라지게 함
    }, 1500) // 2초 후에 실행됨
  }
  const handlePause = () => {
    hideIconHandler()
    setOnPlaying((prev) => !prev)
  }

  return (
    <div
      style={{
        maxHeight: "100vh",
        overflow: "scroll",
        scrollSnapType: "y",
        justifyContent: "center",
        marginTop: "140px",
        display: "flex",
      }}
    >
      <div style={{ position: "relative", display: "flex" }}>
        {/* 상위 요소를 position: relative로 설정 */}
        <div
          style={{
            scrollSnapAlign: "start",
            width: "400px",
            height: "700px",
            border: "1px solid #e0e0e0",
            borderRadius: "15px",
            objectFit: "cover",
            backgroundColor: "black",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", margin: "5px" }}>
                <CommonIconButton
                  onClick={handlePause}
                  background={"#00ff0000"}
                  color={"white"}
                  icon={onPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                />

                <div
                  onMouseEnter={() => setShowVolumeControl(true)}
                  onMouseLeave={() => setShowVolumeControl(false)}
                >
                  <CommonIconButton
                    onClick={muteHandler}
                    background={"#00ff0000"}
                    color={"white"}
                    icon={
                      volumn === 0 ? (
                        <VolumeOffIcon />
                      ) : volumn > 0 && volumn < 60 ? (
                        <VolumeDownIcon />
                      ) : (
                        <VolumeUpIcon />
                      )
                    }
                  />
                </div>
                <div
                  onMouseEnter={() => setShowVolumeControl(true)} // PlayIcon에 마우스가 올라갈 때 볼륨 컨트롤을 보여줌
                  onMouseLeave={() => setShowVolumeControl(false)}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: showVolumeControl ? "#333333" : "transparent", // 볼륨 컨트롤이 보이는 경우에만 배경색을 #333333으로 변경
                    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // opacity와 transform에 대한 transition 설정
                    display: "flex",
                    alignItems: "center",
                    opacity: showVolumeControl ? 1 : 0, // 볼륨 컨트롤이 보이는 경우에만 투명도를 1로 설정하여 표시
                    transform: showVolumeControl ? "translateX(0)" : "translateX(10px)", // 조금씩 오른쪽으로 이동하여 나타나도록 설정
                  }}
                >
                  <Slider
                    className="volunn_slider"
                    aria-label="Volume"
                    value={volumn}
                    onChange={handleChange}
                    sx={{
                      margin: "0px 10px",
                      color: "white",
                      width: "200px",
                      padding: "3px 0px",
                    }}
                  />
                </div>
              </div>
              <div>gg</div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Avatar className="clickable" />
                  <Typography className="clickable" variant="body1" color={"white"}>
                    닉네임
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      maxHeight: "40px",
                      maxWidth: "70px",
                    }}
                  >
                    구독
                  </Button>
                </div>
                <Typography variant="body1" color={"white"}>
                  제목
                </Typography>
                {/* <div>제목</div> */}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "65%",
              margin: "80px 0px",
              color: "wheat",
              position: "relative", // 부모 div에 position: relative; 추가
            }}
          >
            {/* 영상 */}
            <ReactPlayer
              onClick={handlePause}
              url={dummyData[0].sources[0]}
              width={"100%"}
              height={"100%"}
              playing={onPlaying}
            />

            {/* 중앙 아이콘 애니메이션 */}
            <div
              style={{
                position: "absolute",
                width: "72px",
                height: "72px",
                display: hideIcon ? "none" : "block",
                top: "50%", // 부모 div의 세로 중앙을 기준으로 설정
                left: "50%", // 부모 div의 가로 중앙을 기준으로 설정
                transform: "translate(-50%, -50%)", // 요소를 수평 및 수직으로 50%씩 이동하여 정중앙에 배치
              }}
            >
              {/* <div style={{ zIndex: 1200 }}>hi</div> */}
              {onPlaying ? (
                <PlayCircleIcon
                  style={{
                    fontSize: "70px",
                  }}
                />
              ) : (
                <PauseCircleIcon
                  style={{
                    fontSize: "70px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {/* 아이템 컨테이너 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            margin: "15px",
            gap: "15px",
          }}
        >
          {/* 아이템 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              gap: "5px",
            }}
          >
            <CommonIconButton
              onClick={() => {
                setGood((prev) => !prev)
              }}
              background={good ? "black" : undefined}
              color={good ? "white" : undefined}
              icon={<ThumbUpIcon />}
            />
            <div>100</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <CommonIconButton
              onClick={() => {
                setBad((prev) => !prev)
              }}
              background={bad ? "black" : undefined}
              color={bad ? "white" : undefined}
              icon={<ThumbDownIcon />}
            />
            <div>100</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <CommonIconButton icon={<CommentIcon />} />

            <div>100</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <CommonIconButton icon={<ShareIcon />} />
            <div>공유</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <CommonIconButton icon={<MoreVertIcon />} />
            <Avatar className="clickable" />
          </div>
        </div>

        {/* 메뉴판 */}
        <div
          style={{
            scrollSnapAlign: "start",
            width: "400px",
            height: "700px",
            border: "1px solid #e0e0e0",
            borderRadius: "15px",
            objectFit: "cover",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <Typography variant="h6" fontWeight={"600"}>
                  댓글
                </Typography>
                <Typography fontWeight={"600"} color={"gray"}>
                  200
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <CommonIconButton background={"#00ff0000"} icon={<SortIcon />} />
                <CommonIconButton background={"#00ff0000"} icon={<CloseIcon />} />

                {/* <div>gg</div> */}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, margin: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <UserFeedBackContainer /> */}
                <div style={{ display: "flex" }}>
                  <Avatar />
                  <TextField
                    id="standard-basic"
                    label="댓글 추가..."
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 메뉴판끝 */}
      </div>
    </div>
  )
}
