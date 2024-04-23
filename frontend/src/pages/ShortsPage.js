import React, { useEffect, useState } from "react"
import ShareIcon from "@mui/icons-material/Share"
import { ShortsItem } from "components/shorts/ShortsItem"

import { CommonIconButton } from "components/common/CommonIconButton"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useLazyQuery } from "@apollo/client"
import { FIND_USERS_ID_BY_SORT } from "apollo/query"
export const ShortsPage = () => {
  const [shorts, setShorts] = useState([])
  const [getBySort, { data, loading }] = useLazyQuery(FIND_USERS_ID_BY_SORT)

  useEffect(() => {
    if (!loading && data) {
      // 쿼리가 완료되고 데이터가 존재할 때만 실행
      setShorts(data)
    }
  }, [loading, data])

  useEffect(() => {
    getBySort({
      variables: { sort: "movie", start: 0, limit: 2 },
    })
  }, [])
  console.log(shorts)
  return (
    <div>
      {shorts?.youtubeMedias?.map((item, index) => (
        <ShortsItem key={index} identify={index} />
      ))}
      {/* <section className="new-slider-section">nothing</section> */}
    </div>
  )
}
