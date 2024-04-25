import { useLazyQuery } from "@apollo/client"
import { GET_SEARCH_VIDEOS } from "apollo/query"
import { MenuSelector } from "components/common/MenuSelector"
import NoResultsPage from "components/Search/NoResult"
import { SearchItem } from "components/Search/SearchItem"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

export const SearchPage = () => {
  const params = useParams()

  const [getSearchVideos, { data, error, loading, called }] = useLazyQuery(GET_SEARCH_VIDEOS)

  useEffect(() => {
    if (!called || loading) {
      getSearchVideos({ variables: { title: params?.keyword } })
    }
    console.log(data)
  }, [data])
  console.log(params.keyword)
  if (!params.keyword || (data && data.youtubeMedias.length === 0)) {
    return <NoResultsPage />
  }
  return (
    <>
      <MenuSelector categories={["전체", "게임", "영화", "음악", "애니메이션", "감상한 동영상"]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "15px",
          gap: "25px",
        }}
      >
        {data?.youtubeMedias?.map((video, index) => (
          <React.Fragment key={index}>
            <SearchItem data={video} />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
