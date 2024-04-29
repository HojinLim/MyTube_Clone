import * as React from "react"

import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import CloseIcon from "@mui/icons-material/Close"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined"
import { CommonIconButton } from "components/common/CommonIconButton"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import MultilineTextField from "components/common/MultilineTextField"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { accountState } from "atom/accountState"
import { useSendMeesage } from "hooks/useSendMessage"
import { openOpinionState } from "atom/openOpinionState"

export default function OpinionDrawer() {
  const setOpenOpinion = useSetRecoilState(openOpinionState)
  const [message, setMessage] = React.useState("")
  const [open, setOpen] = React.useState(true)
  const user = useRecoilValue(accountState)

  const { sendEmail } = useSendMeesage({ username: user?.name, email: user?.email, message })

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const sendHandler = () => {
    sendEmail()
    setMessage("")
    setOpen(false)
  }

  const list = (anchor) => (
    <Box sx={{ width: 260, height: "95vh" }} role="presentation">
      {/* 상단 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
          height: "5%",
          alignItems: "center",
        }}
      >
        <Typography variant="h7" fontWeight={"600"}>
          YouTube에 의견 보내기
        </Typography>
        <IconButton
          onClick={() => {
            toggleDrawer(false)
            setOpenOpinion(false)
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <Divider />
      {/* 중단 */}
      <div style={{ height: "90%", padding: "20px 10px" }}>
        <Typography variant="body2">의견을 설명해 주세요.</Typography>
        <MultilineTextField
          rows={8}
          label={"의견 작성란"}
          initialText={message}
          onTextChange={(e) => setMessage(e)}
        />
        <Typography variant="caption">민간한 정보는 포함하지 마세요.</Typography>
        <br />
        <Typography variant="caption">
          스크린샷을 주시면 Google에서 의견을 더 잘 이해하는 데 도움이 됩니다. (선택사항).
        </Typography>
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          height: "5%",
          justifyContent: "end", // 수평 가운데 정렬
          alignItems: "center",
          padding: "0px 10px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "lightgray",
            height: "100%",
            maxHeight: "30px",
            margin: "10px 0px",
          }}
          onClick={() => {
            sendHandler()
            setOpenOpinion(false)
          }}
        >
          보내기
        </Button>
      </div>
    </Box>
  )

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>
    </div>
  )
}
