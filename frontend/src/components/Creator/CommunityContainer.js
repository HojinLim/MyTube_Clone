import React, { useEffect, useState } from "react"

import { CommunityBox } from "./CommunityBox"

import { GET_ALL_COMMUNITIES } from "apollo/query"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { CommunityInputBox } from "./CommunityInputBox"
import { whichStudioState } from "atom/whichStudioState"

export const CommunityContainer = () => {
  const user = useRecoilValue(accountState)
  const page = useRecoilValue(whichStudioState)
  const [getAllCommunities, { data, loading, refetch }] = useLazyQuery(GET_ALL_COMMUNITIES)

  const [isMine, setIsMine] = useState(false)
  useEffect(() => {
    user.name == page ? setIsMine(true) : setIsMine(false)
  }, [user, page])

  useEffect(() => {
    if (data && !loading) {
      console.log(data)
    }
  }, [data])
  useEffect(() => {
    getAllCommunities({ variables: { id: user.uid } })
  }, [refetch])
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
      {isMine && <CommunityInputBox refetch={refetch} />}
      {data?.communities?.reverse().map((data, key) => (
        <React.Fragment key={key}>
          <CommunityBox data={data} refetch={refetch} />
        </React.Fragment>
      ))}
    </div>
  )
}
