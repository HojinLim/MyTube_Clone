import { accountState } from "atom/accountState"
import { useHandleSub } from "hooks/useHandleSub"
import { useMySubArr } from "hooks/useMySubArr"
import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"

export const TestPage = () => {
  const user = useRecoilValue(accountState)
  const { data } = useMySubArr({ my_id: user?.id })
  console.log("data", data)

  return <div className="App"></div>
}
