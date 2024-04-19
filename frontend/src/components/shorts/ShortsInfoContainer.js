import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import { useHandleSub } from "hooks/useHandleSub"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"

export const ShortsInfoContainer = (props) => {
  const { sub, setSub, video, refetch } = props
  const { title, created_user } = video ?? {}
  console.log(video)
  const user = useRecoilValue(accountState)

  const { subArr, subed, changeSubHandler, isYours, data } = useHandleSub({
    owner_id: video?.created_user?.id,
    my_id: user?.uid,
  })

  return (
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
          <Avatar className="clickable" src={created_user?.profileImage} />
          <Typography className="clickable" variant="body1" color={"white"}>
            {created_user?.username}
          </Typography>
          <Button
            disabled={isYours}
            onClick={() => setSub((prev) => !prev)}
            variant="contained"
            style={{
              backgroundColor: !sub ? "white" : "#3f4042",
              borderRadius: "20px",
              maxHeight: "40px",
              maxWidth: "80px",
              color: !sub ? "black" : "white",
            }}
          >
            {isYours && "당신것"}
            {!isYours && !subed && "구독"}
            {!isYours && subed && "구독중"}
          </Button>
        </div>
        <Typography variant="body1" color={"white"}>
          {title}
        </Typography>
      </div>
    </div>
  )
}
