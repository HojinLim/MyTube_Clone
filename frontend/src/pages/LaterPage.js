import React, { useEffect } from "react"

import { VideoItem } from "components/later/VideoItem"
import { MenuSelector } from "components/common/MenuSelector"
import { dummyData } from "dummy"
import { PlayListSide } from "components/PlayList/PlayListSide"
import { useLazyQuery } from "@apollo/client"
import { GET_LATER_BY_UID } from "apollo/query"
import { USER_INFO } from "Constants/value"
export const LaterPage = () => {
  const user = localStorage.getItem(USER_INFO) ?? ""
  const [getLaterByUid, { data, loading, error }] = useLazyQuery(GET_LATER_BY_UID)
  useEffect(() => {
    if (!error && !loading && data) {
      console.log(data)
    }
  }, [data, loading, error])

  useEffect(() => {
    getLaterByUid({ variables: { uid: user.uid } })
  }, [])
  return (
    <div>
      <PlayListSide
        datas={data?.laters[0]?.youtube_medias[0]}
        length={data?.laters[0]?.youtube_medias?.length}
        sideTitle={"나중에 볼 영상"}
      />

      {/* 모두재생, 셔플 */}

      <div className="video_container">
        <div style={{ display: "flex" }}>
          <MenuSelector categories={["전체", "동영상", "Shorts"]} />
        </div>

        {data?.laters[0]?.youtube_medias?.map((data, key) => (
          <div key={key}>
            <VideoItem datas={data} key={key} />
          </div>
        ))}
      </div>
    </div>
  )
}
