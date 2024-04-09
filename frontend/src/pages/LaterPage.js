import React, { useEffect } from "react"

import { VideoItem } from "components/later/VideoItem"
import { MenuSelector } from "components/common/MenuSelector"

import { PlayListSide } from "components/PlayList/PlayListSide"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { GET_LATER_VIDEO_BY_ID } from "apollo/query"

export const LaterPage = () => {
  const user = useRecoilValue(accountState)

  const [getLaterVideo, { data, error, loading, called }] = useLazyQuery(GET_LATER_VIDEO_BY_ID)

  useEffect(() => {
    if (!called || loading) {
      getLaterVideo({ variables: { id: "26" } })
    }
    console.log(data?.youtubeMedias)
  }, [data])

  // console.log(data?.youtube_medias)
  return (
    <div>
      <PlayListSide
        datas={data?.youtubeMedias[0]}
        length={data?.youtubeMedias?.length}
        sideTitle={"나중에 볼 영상"}
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
