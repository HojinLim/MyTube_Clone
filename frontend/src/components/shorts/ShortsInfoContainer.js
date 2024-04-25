import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import { useHandleSub } from "hooks/useHandleSub"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { useNavigate } from "react-router-dom"
import { COLOR_BLACK_600 } from "config/constants"
import SimpleDialog from "components/common/SimpleDialog"

export const ShortsInfoContainer = (props) => {
  const navi = useNavigate()
  const { video, refetch } = props
  const { title, created_user } = video ?? {}
  console.log(video)
  const user = useRecoilValue(accountState)
  const [clickCancel, setClickCancel] = useState(false)

  const { subArr, subed, changeSubHandler, isYours, data } = useHandleSub({
    owner_id: video?.created_user?.id,
    my_id: user?.uid,
  })
  const moveOwnerPage = () => {
    navi(`/@${user.name}`)
  }
  console.log(created_user)
  console.log(clickCancel)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        height: "10%",
        margin: "15px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar className="clickable" src={created_user?.profileImage} onClick={moveOwnerPage} />
        <Typography className="clickable" variant="body1" color={"white"} onClick={moveOwnerPage}>
          {created_user?.username}
        </Typography>

        <Button
          disabled={isYours}
          onClick={() => {
            if (!subed) {
              setClickCancel(false)
              changeSubHandler()
            } else {
              setClickCancel(true)
            }
          }}
          variant="contained"
          style={{
            backgroundColor: !subed ? "white" : COLOR_BLACK_600,
            borderRadius: "20px",
            maxHeight: "40px",
            maxWidth: "80px",
            color: !subed ? "black" : "white",
          }}
        >
          {clickCancel && (
            <SimpleDialog
              initState
              title={`@${created_user?.username} 구독을 취소하시겠습니까?`}
              cancelText="취소"
              confirmText="구독 취소"
              execute={() => {
                setClickCancel(false)
                changeSubHandler()
              }}
              cancel={() => {
                setClickCancel(false)
              }}
            />
          )}

          {isYours && "당신것"}
          {!isYours && !subed && "구독"}
          {!isYours && subed && "구독중"}
        </Button>
      </div>
      <Typography variant="body1" color={"white"}>
        {title}
      </Typography>
    </div>
  )
}
