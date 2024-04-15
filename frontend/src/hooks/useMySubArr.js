import { useLazyQuery } from "@apollo/client"
import { FIND_USER_ID_BY_ID } from "apollo/query"
import React, { useEffect } from "react"

export const useMySubArr = ({ my_id }) => {
  const [getUserById, { data, loading, refetch, called }] = useLazyQuery(FIND_USER_ID_BY_ID)

  useEffect(() => {
    const getSubData = async () => {
      try {
        await getUserById({
          variables: { id: my_id },
        })
      } catch {}
    }
    getSubData()
  }, [getUserById, my_id])
  return { data, refetch, called, loading }
}
