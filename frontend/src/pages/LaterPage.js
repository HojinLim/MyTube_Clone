import React from "react"

import { VideoItem } from "components/later/VideoItem"
import { MenuSelector } from "components/common/MenuSelector"
import { dummyData } from "dummy"
import { PlayListSide } from "components/PlayList/PlayListSide"
export const LaterPage = () => {
  return (
    <div>
      <PlayListSide sideTitle={"나중에 볼 영상"} />

      {/* 모두재생, 셔플 */}

      <div className="video_container">
        <div style={{ display: "flex" }}>
          <MenuSelector categories={["전체", "동영상", "Shorts"]} />
        </div>

        <VideoItem datas={dummyData[0]} />
        <VideoItem datas={dummyData[1]} />
        <VideoItem datas={dummyData[2]} />
      </div>
    </div>
  )
}
