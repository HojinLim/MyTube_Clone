import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_LIKES_BY_UID } from "apollo/query"
import { MenuSelector } from "components/common/MenuSelector"
import { VideoItem } from "components/later/VideoItem"
import { PlayListSide } from "components/PlayList/PlayListSide"
import { USER_INFO } from "Constants/value"
import { dummyData } from "dummy"
import React, { useEffect } from "react"

export const LikePage = () => {
  const user = localStorage.getItem(USER_INFO) ?? ""
  const [getLikeByUid, { data, loading, error }] = useLazyQuery(GET_LIKES_BY_UID)
  useEffect(() => {
    if (!error && !loading && data) {
      console.log(data)
    }
  }, [data, loading, error])

  useEffect(() => {
    getLikeByUid({ variables: { uid: user.uid } })
  }, [])

  return (
    <div>
      <PlayListSide
        datas={data?.likeds[0]?.youtube_medias[0]}
        length={data?.likeds[0]?.youtube_medias?.length}
        sideTitle={"좋아요 표시한 동영상"}
      />

      {/* 모두재생, 셔플 */}

      <div className="video_container">
        <div style={{ display: "flex" }}>
          <MenuSelector categories={["전체", "동영상", "Shorts"]} />
        </div>

        {data?.likeds[0]?.youtube_medias?.map((data, key) => (
          <>
            <VideoItem datas={data} key={key} />
          </>
        ))}
      </div>
    </div>
  )
}
