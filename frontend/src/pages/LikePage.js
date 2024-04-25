import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_LIKES_BY_UID } from "apollo/query"
import { accountState } from "atom/accountState"
import { MenuSelector } from "components/common/MenuSelector"
import { VideoItem } from "components/later/VideoItem"
import { PlayListSide } from "components/PlayList/PlayListSide"

import { dummyData } from "dummy"
import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"

export const LikePage = () => {
  const user = useRecoilValue(accountState)
  const [getLikeByUid, { data, error, loading }] = useLazyQuery(GET_LIKES_BY_UID)

  useEffect(() => {
    if (user && user.uid) {
      // Ensure user object and user.uid exist
      getLikeByUid({ variables: { id: user.uid } })
    }
  }, [getLikeByUid, user])

  useEffect(() => {
    if (!loading && data) {
      console.log("Liked videos data:", data)
    }
  }, [data, loading])

  return (
    <div>
      <PlayListSide
        datas={data?.youtubeMedias[0]}
        length={data?.youtubeMedias?.length}
        sideTitle={"좋아요 표시한 동영상"}
      />

      {/* 모두재생, 셔플 */}

      <div className="video_container">
        <div style={{ display: "flex" }}>
          <MenuSelector categories={["전체", "동영상", "Shorts"]} />
        </div>

        {data?.youtubeMedias?.map((data, key) => (
          <div key={key}>
            <VideoItem datas={data} />
          </div>
        ))}
      </div>
    </div>
  )
}
