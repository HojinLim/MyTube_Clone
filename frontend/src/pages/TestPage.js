import { useLazyQuery } from "@apollo/client"
import { GET_LATER_VIDEO_BY_ID } from "apollo/query"
import { testState } from "atom/testState"
import React, { useEffect } from "react"

export const TestPage = () => {
  const [getLaterVideo, { data, error, loading, called }] = useLazyQuery(GET_LATER_VIDEO_BY_ID)

  useEffect(() => {
    if (!called) {
      getLaterVideo({ variables: { id: "26" } })
    }
    console.log(data?.youtubeMedias)
  }, [data])
  return <div className="App"></div>
}
