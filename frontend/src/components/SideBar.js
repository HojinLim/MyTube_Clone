import * as React from "react"
import { useApolloClient } from "@apollo/client"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import HomeIcon from "@mui/icons-material/Home"
import SubscriptionIcon from "@mui/icons-material/Subscriptions"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Shorts from "@mui/icons-material/Speed"
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
import Toolbar from "@mui/material/Toolbar"
import { Typography } from "@mui/material"
import { GoogleLoginButton } from "./GoogleLoginButton"
import SmartDisplay from "@mui/icons-material/SmartDisplay"
import { styled } from "@mui/material/styles"
import Avatar from "@mui/material/Avatar"
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { changeState } from "atom/changeState"
import { accountState } from "atom/accountState"
import youtuber1 from "assets/images/logos/youtuber_logo_1.jpg"
import youtuber2 from "assets/images/logos/youtuber_logo_2.png"

const drawerWidth = 240

function SideBar(props) {
  const StyledGrid = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "150%",
      marginTop: "130px",
      marginLeft: "15vw",
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      backgroundColor: "#cfeeee",
      paddingTop: "30px",
    },
  }))

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [dummy, setDummy] = React.useState()
  const [state, toggleState] = useRecoilState(changeState)
  const [user, setUser] = useRecoilState(accountState)
  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const drawer = (
    <div style={{ marginTop: "80px" }}>
      <Divider />
      {/* 윗 리스트 아이콘 */}
      <List>
        <List>
          {["Home", "Shorts", "구독"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <Shorts />}
                  {index === 2 && <SubscriptionIcon />}
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
        {["나", "시청 기록"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <VideoLibraryIcon />}
                {index === 1 && <RestoreIcon />}
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
              {["침착맨", "슈카월드"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 && <Avatar src={youtuber1} />}
                      {index === 1 && <Avatar src={youtuber2} />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
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
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <WhatshotIcon />}
                {index === 1 && <MusicNoteIcon />}
                {index === 2 && <MovieIcon />}
                {index === 3 && <GameIcon />}
                {index === 4 && <SportsIcon />}
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
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <SmartDisplay />}
                {index === 1 && <SmartDisplay />}
                {index === 2 && <SmartDisplay />}
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
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <SettingIcon />}
                {index === 1 && <FlagIcon />}
                {index === 2 && <HelpIcon />}
                {index === 3 && <LiveHelpIcon />}
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
    </div>
  )

  return (
    <Box position="fixed">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: state ? "block" : "none", // 상태에 따라 display 설정
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default SideBar
