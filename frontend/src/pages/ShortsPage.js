import React, { useEffect, useState } from "react"
import { ShortsItem } from "components/shorts/ShortsItem"
import { useLazyQuery } from "@apollo/client"
import { FIND_USERS_ID_BY_SORT } from "apollo/query"
import { GET_ALL_SHORTS } from "apollo/query"
export const ShortsPage = () => {
  const [shorts, setShorts] = useState([])
  const [getAllShorts, { data, loading, refetch }] = useLazyQuery(GET_ALL_SHORTS)

  useEffect(() => {
    if (!loading && data) {
      // 쿼리가 완료되고 데이터가 존재할 때만 실행
      setShorts(data)
    }
  }, [loading, data])

  useEffect(() => {
    getAllShorts({
      variables: { sort: "shorts" },
    })
  }, [])
  console.log(shorts)
  window.addEventListener("wheel", (e) => {
    console.log(e.deltaY)
  })
  return (
    <div>
      {shorts?.youtubeMedias?.map((item, index) => (
        <ShortsItem key={index} identify={index} shorts={item} refetch={refetch} />
      ))}
      {/* <section className="new-slider-section">nothing</section> */}
    </div>
  )
}
