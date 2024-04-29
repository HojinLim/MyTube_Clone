import React, { useEffect } from "react"

import { CommunityBox } from "./CommunityBox"

import { GET_ALL_COMMUNITIES } from "apollo/query"
import { useLazyQuery, useQuery } from "@apollo/client"

export const CommunityContainer = () => {
  const [getAllCommunities, { data, loading, refetch }] = useLazyQuery(GET_ALL_COMMUNITIES)

  useEffect(() => {
    if (data && !loading) {
      console.log(data)
    }
  }, [data])
  useEffect(() => {
    getAllCommunities({ variables: { id: "26" } })
  }, [])
  console.log(data)

  return (
    <div
      style={{
        padding: "30px 0px",
        alignItems: "start",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      {data?.communities?.map((data, key) => (
        <React.Fragment key={key}>
          <CommunityBox data={data} refetch={refetch} />
        </React.Fragment>
      ))}
    </div>
  )
}
