import React from "react"
import Skeleton from "@mui/material/Skeleton"
export const VideoSkeleton = () => {
  return (
    <div className="video-skeleton">
      {/* 영상 컨테이너 -상단*/}
      <div style={{ height: "50%" }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      {/* 하단 */}
      <div style={{ width: "100%", height: "40%", display: "flex" }}>
        <div style={{ display: "flex", width: "20%", height: "100%" }}>
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div style={{ width: "80%", height: "100%", display: "flex", flexDirection: "column" }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
          <Skeleton variant="text" width="100%" height="100%" />
        </div>
      </div>
    </div>
  )
}
