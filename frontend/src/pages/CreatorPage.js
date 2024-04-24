import React, { useEffect, useMemo, useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import Tooltip from "@mui/material/Tooltip"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"

import { HomeContainer } from "components/Creator/HomeContainer"
import { VideoContainer } from "components/Creator/VideoContainer"
import { PlayListContainer } from "components/Creator/PlayListContainer"
import { CommunityContainer } from "components/Creator/CommunityContainer"
import { useLazyQuery, useQuery } from "@apollo/client"
import { FIND_USER_ID_BY_NAME } from "apollo/query"
import { useHandleSub } from "hooks/useHandleSub"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { useFindUserData } from "hooks/useFindUserData"
export const CreatorPage = () => {
  const params = useParams()
  const [value, setValue] = useState(0)
  const [subscript, setSubscript] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const nickname = params.nickname.split("@")
  const user = useRecoilValue(accountState)

  // 영상 주인
  const { userData } = useFindUserData({ nickname: nickname[1] })
  const { id: owner_id, profileImage, created_youtubes } = userData?.users[0] || {}

  console.log(userData)
  console.log(created_youtubes)
  const { subArr, subed, changeSubHandler, isYours, data } = useHandleSub({
    owner_id: owner_id,
    my_id: user?.uid,
  })

  return (
    <div style={{ padding: "50px" }}>
      {/* 앱 헤더 컨테이너 */}
      <div className="creator-app-header-container">
        {/* 로고 이미지 */}
        {/* <div className="creator-app-header">
          <img className="creator-app-header" src={logo} style={{ position: "relative" }} />
        </div> */}
        <div className="creator-inform-container">
          <img
            style={{
              minWidth: "150px",
              maxHeight: "150px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={profileImage}
          />
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 30px" }}>
            <Tooltip title={nickname} placement="top">
              <Typography variant="h3" fontWeight={"800"}>
                {nickname}
              </Typography>
            </Tooltip>
            <Typography variant="caption" style={{ margin: "10px 0px" }}>
              {nickname} - 구독자 {subArr?.length}명 - 동영상 {created_youtubes?.length}개
            </Typography>
            <Typography className="creator-inform-click" variant="body2">
              정보
            </Typography>
            <Link href="#">example.com</Link>
            <Button
              disabled={isYours ? true : false}
              onClick={changeSubHandler}
              variant="contained"
              sx={{
                backgroundColor: "lightgray",
                borderRadius: "20px",
                maxHeight: "40px",
                margin: "10px 0px",
              }}
            >
              {!isYours && subed && <NotificationsNoneOutlinedIcon />}
              {!isYours && subed && "구독중"}
              {!isYours && !subed && "구독"}
              {isYours && "당신 채널"}
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
        >
          <Tab label="홈" />
          <Tab label="동영상" />
          <Tab label="재생목록" />
          <Tab label="커뮤니티" />
        </Tabs>
        <IconButton>
          <SearchIcon style={{ alignSelf: "center" }} />
        </IconButton>
        <TextField id="standard-basic" label="검색" variant="standard" />
      </div>
      <Divider />

      {/* 홈 컨테이너 */}
      {value === 0 && <HomeContainer datas={created_youtubes} />}
      {value === 1 && <VideoContainer datas={created_youtubes} />}
      {value === 2 && <PlayListContainer datas={created_youtubes} />}
      {value === 3 && <CommunityContainer />}
    </div>
  )
}
