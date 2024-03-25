import { MenuSelector } from "components/common/MenuSelector"
import { VideoItem } from "components/later/VideoItem"
import { PlayListSide } from "components/PlayList/PlayListSide"
import { dummyData } from "dummy"
import React from "react"

export const LikePage = () => {
  return (
    <div>
      <PlayListSide sideTitle={"좋아요 표시한 동영상"} />

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
