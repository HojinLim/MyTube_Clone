import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_LATER_BY_UID } from "apollo/query"

const useUserData = () => {
  const [getLaterByUid, { data, loading, error }] = useLazyQuery(GET_LATER_BY_UID)

  useEffect(() => {
    if (!error && !loading && data) {
    }
  }, [data, loading, error])

  return { data, loading, error, getLaterByUid }
}

export default useUserData
