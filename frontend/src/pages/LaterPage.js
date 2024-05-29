import React, { useEffect, useState } from "react"

import { VideoItem } from "components/later/VideoItem"
import { MenuSelector } from "components/common/MenuSelector"

import { PlayListSide } from "components/PlayList/PlayListSide"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { useLazyQuery } from "@apollo/client"
import { GET_LATER_VIDEO_BY_ID } from "apollo/query"

export const LaterPage = () => {
  const user = useRecoilValue(accountState)
  const [clickedId, setClickedId] = useState(null)

  const [getLaterVideo, { data, error, loading, called, refetch }] =
    useLazyQuery(GET_LATER_VIDEO_BY_ID)

  useEffect(() => {
    if (!called || loading) {
      getLaterVideo({ variables: { id: user?.uid } })
    }
    console.log(data?.youtubeMedias)
  }, [data, user, called])

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PlayListSide
        datas={data?.youtubeMedias[0]}
        length={data?.youtubeMedias?.length}
        sideTitle={"나중에 볼 영상"}
        setClickedId={setClickedId}
        refetch={refetch}
        loading={loading}
      />

      {/* 모두재생, 셔플 */}
      <div className="flexible-container">
        <div style={{ display: "flex" }}>
          <MenuSelector categories={["전체", "동영상", "Shorts"]} />
        </div>

        {data?.youtubeMedias?.map((data, key) => (
          <div className="item" key={key}>
            <VideoItem
              datas={data}
              indentifier={key}
              setClickedId={setClickedId}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
