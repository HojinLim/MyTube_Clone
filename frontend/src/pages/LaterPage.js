import React, { useEffect, useState } from "react"

import { VideoItem } from "components/later/VideoItem"
import { MenuSelector } from "components/common/MenuSelector"

import { PlayListSide } from "components/PlayList/PlayListSide"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { GET_LATER_VIDEO_BY_ID } from "apollo/query"
import useUpdateLater from "hooks/useUpdateLater"

export const LaterPage = () => {
  const user = useRecoilValue(accountState)
  const [clickedId, setClickedId] = useState(null)

  const [getLaterVideo, { data, error, loading, called, refetch }] =
    useLazyQuery(GET_LATER_VIDEO_BY_ID)

  // const { isAdded, addLaterVideoHandler } = useUpdateLater({
  //   later_users: data?.youtubeMedias?.later_users,
  //   refetch: refetch,
  //   user: user,
  //   id: clickedId,
  // })

  useEffect(() => {
    if (!called || loading) {
      getLaterVideo({ variables: { id: user?.uid } })
    }
    console.log(data?.youtubeMedias)
  }, [data, user, called])
  console.log(clickedId)
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PlayListSide
        datas={data?.youtubeMedias[0]}
        length={data?.youtubeMedias?.length}
        sideTitle={"나중에 볼 영상"}
        setClickedId={setClickedId}
        refetch={refetch}
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
