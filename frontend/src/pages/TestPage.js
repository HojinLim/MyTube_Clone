// 단지 테스트용 페이지입니다.
// 향후 제거될 예정입니다.
// /test
import React from "react"

import { dummyData } from "dummy"
import { FIND_USER_BY_EMAIL } from "apollo/query"
import { useLazyQuery, useQuery } from "@apollo/client"

export const TestPage = () => {
  const { loading, error, data } = useQuery(FIND_USER_BY_EMAIL, {
    variables: { email: "test@aa.com" },
  })
  console.log(data)
  console.log(loading)

  return <>{!loading && <div>{data.users[0].email}</div>}</>
}
