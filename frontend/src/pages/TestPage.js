import { useLazyQuery } from "@apollo/client"
import { GET_LIKES_BY_UID } from "apollo/query"
import { GET_LATER_VIDEO_BY_ID } from "apollo/query"
import { accountState } from "atom/accountState"
import { testState } from "atom/testState"
import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"

export const TestPage = () => {
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
  return <div className="App"></div>
}
