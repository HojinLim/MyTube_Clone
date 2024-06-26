import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import YoutubeLogo from "assets/images/logos/logo.png"
import { useNavigate } from "react-router-dom"

// Icons
import RestoreIcon from "@mui/icons-material/Restore"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MovieIcon from "@mui/icons-material/Movie"
import GameIcon from "@mui/icons-material/SportsEsports"
import SportsIcon from "@mui/icons-material/EmojiEvents"
import SettingIcon from "@mui/icons-material/Settings"
import FlagIcon from "@mui/icons-material/Flag"
import HelpIcon from "@mui/icons-material/HelpOutline"
import LiveHelpIcon from "@mui/icons-material/LiveHelp"
import HomeIcon from "@mui/icons-material/Home"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import Shorts from "@mui/icons-material/Speed"
import SubscriptionIcon from "@mui/icons-material/Subscriptions"
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined"
import SmartDisplay from "@mui/icons-material/SmartDisplay"
import MenuIcon from "@mui/icons-material/Menu"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import WatchLaterIcon from "@mui/icons-material/WatchLater"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"

import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"
import { GoogleLoginButton } from "./GoogleLoginButton"
import youtuber1 from "assets/images/logos/youtuber_logo_1.jpg"
import youtuber2 from "assets/images/logos/youtuber_logo_2.png"
import { accountState } from "atom/accountState"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { GET_ALL_VIDEOS } from "apollo/query"
import { useLazyQuery, useQuery } from "@apollo/client"

import { FIND_USER_ID_BY_ID } from "apollo/query"
import { useMySubArr } from "hooks/useMySubArr"
import { clickTermState } from "atom/clickTermState"
import OpinionDrawer from "./opinion/OpinionDrawer"
import { openOpinionState } from "atom/openOpinionState"

export default function SideBar() {
  const navigate = useNavigate()

  const user = useRecoilValue(accountState)
  const setOpenOpinion = useSetRecoilState(openOpinionState)
  const [clickTerm, setClickTerm] = useRecoilState(clickTermState)
  const { data, refetch: sub_refetch } = useMySubArr({ my_id: user?.uid })
  const { sub_users } = data?.users[0] || {}
  console.log(sub_users)

  const commonStyle = {
    color: "black",
  }
  React.useEffect(() => {
    if (clickTerm) {
      setTimeout(() => {
        console.log("0.5초가 지났습니다.")
        sub_refetch()
        setClickTerm(false)
      }, 500)
    }
  }, [clickTerm])

  const [state, setState] = React.useState({
    left: false,
  })
  const [findUserById, { loading, error, data: videos, refetch }] = useLazyQuery(FIND_USER_ID_BY_ID)

  const middleList = user
    ? ["나", "시청 기록", "내 동영상", "나중에 볼 동영상", "좋아요 표시한 동영상"]
    : ["나", "시청 기록"]

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  React.useEffect(() => {
    findUserById({ variables: { id: user?.uid } }).then(() => {
      refetch()
      console.log(videos)
    })
  }, [])

  const movePage = (name) => {
    switch (name) {
      case "나":
        navigate("/")
        break
      case "Home":
        navigate("/")
        break
      case "시청 기록":
        navigate("/history")
        break
      case "구독":
        navigate("/subscription")
        break
      case "좋아요 표시한 동영상":
        navigate("/like")
        break
      case "나중에 볼 동영상":
        navigate("/later")
        break
      case "내 동영상":
        navigate("/studio")
        break
      case "Shorts":
        navigate("/shorts")
        break
      case name:
        navigate(`/@${name}`)
        break
      default:
        break
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ display: "flex" }}>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>
        <Button
          aria-label="logo"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          onClick={() => movePage("Home")}
        >
          <img src={YoutubeLogo} alt="Youtube" width="100" height="50" />
        </Button>
      </div>
      {/* 윗 리스트 아이콘 */}
      <List>
        <List>
          {["Home", "Shorts", "구독"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => movePage(text)}>
                <ListItemIcon>
                  {index === 0 && <HomeOutlinedIcon style={commonStyle} />}
                  {index === 1 && <Shorts style={commonStyle} />}
                  {index === 2 && <SubscriptionsOutlinedIcon style={commonStyle} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </List>
      <Divider />
      {/* 밑 리스트 아이콘 */}
      <List>
        {middleList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => movePage(text)} disabled={index == 1}>
              <ListItemIcon>
                {index === 0 && <VideoLibraryIcon style={commonStyle} />}
                {index === 1 && <RestoreIcon style={commonStyle} />}
                {index === 2 && <SlideshowIcon style={commonStyle} />}
                {index === 3 && <AccessTimeIcon style={commonStyle} />}
                {index === 4 && <ThumbUpAltOutlinedIcon style={commonStyle} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box component="section" sx={{ p: 2 }} flexDirection={"column"} display={"flex"}>
        {!user ? (
          <>
            <Typography fontSize={20} variant="h9">
              로그인하면 동영상에 좋아요를 표시하고 댓글을 달거나 구독할 수 있습니다.
            </Typography>
            <GoogleLoginButton />
          </>
        ) : (
          <>
            <Typography fontSize={20} variant="h8">
              구독
            </Typography>

            <List>
              {sub_users?.map((data, index) => (
                <ListItem key={data?.username} disablePadding>
                  <ListItemButton onClick={() => movePage(data?.username)}>
                    <ListItemIcon>
                      <Avatar src={data?.profileImage} />
                    </ListItemIcon>
                    <ListItemText primary={data?.username} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
      <Divider />

      <Typography fontSize={20} variant="h9">
        탐색
      </Typography>
      {/* 밑밑 리스트 아이콘 */}
      <List>
        {["인기 급상승", "음악", "영화", "게임", "스포츠"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                {index === 0 && <WhatshotIcon style={commonStyle} />}
                {index === 1 && <MusicNoteIcon style={commonStyle} />}
                {index === 2 && <MovieIcon style={commonStyle} />}
                {index === 3 && <GameIcon style={commonStyle} />}
                {index === 4 && <SportsIcon style={commonStyle} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography fontSize={20} variant="h9">
        YouTube 더보기
      </Typography>
      <List>
        {["YouTube Premium", "YouTube Music", "YouTube Kids"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                {index === 0 && <SmartDisplay style={commonStyle} />}
                {index === 1 && <SmartDisplay style={commonStyle} />}
                {index === 2 && <SmartDisplay style={commonStyle} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["설정", "신고 기록", "고객센터", "의견 보내기"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              disabled={index !== 3}
              onClick={() => {
                if (index === 3) {
                  setOpenOpinion(true)
                }
              }}
            >
              <ListItemIcon>
                {index === 0 && <SettingIcon style={commonStyle} />}
                {index === 1 && <FlagIcon style={commonStyle} />}
                {index === 2 && <HelpIcon style={commonStyle} />}
                {index === 3 && <LiveHelpIcon style={commonStyle} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <Typography variant="caption" display="block" gutterBottom>
        정보보도자료저작권문의하기크리에이터광고개발자
        <br />
        <br /> 약관개인정보처리방침정책 및 안전YouTube 작동의 원리새로운 기능 테스트하기
        <br />
        <br /> © 2024 Google LLC, Sundar Pichai, 1600 Amphitheatre Parkway, Mountain View CA 94043,
        USA, 0807-882-594 (무료), yt-support-solutions-kr@google.com, 호스팅: Google LLC,
        사업자정보, 불법촬영물 신고 크리에이터들이 유튜브 상에 게시, 태그 또는 추천한 상품들은
        판매자들의 약관에 따라 판매됩니다. 유튜브는 이러한 제품들을 판매하지 않으며, 그에 대한
        책임을 지지 않습니다.
      </Typography>
    </Box>
  )

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
