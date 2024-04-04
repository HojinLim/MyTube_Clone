import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_LATER_BY_UID } from "apollo/query"

const useLaterData = () => {
  //   const [isEmpty, setIsEmpty] = useState()
  const [getLaterByUid, { data, loading, error }] = useLazyQuery(GET_LATER_BY_UID)

  useEffect(() => {
    if (!error && !loading && data) {
      //   setIsEmpty(data.laters.length == 0 ? true : false)
    }
  }, [data, loading, error])

  return { data, loading, error, getLaterByUid }
}

export default useLaterData
