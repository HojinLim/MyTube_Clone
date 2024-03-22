import React from "react"
import Typography from "@mui/material/Typography"
import VideosContainer from "components/Video/VideosContainer"

export const SubscriptionPage = () => {
  return (
    <div>
      <Typography variant="h6" marginLeft={"50px"} fontWeight={"700"}>
        최신순
      </Typography>
      <VideosContainer />
      <Typography variant="h6" marginLeft={"50px"} fontWeight={"700"}>
        Shorts
      </Typography>
    </div>
  )
}
