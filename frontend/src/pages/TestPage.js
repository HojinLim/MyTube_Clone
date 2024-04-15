import { useMutation } from "@apollo/client"
import { UPDATE_ISPUBLIC } from "apollo/mutation"
import { accountState } from "atom/accountState"
import { useHandleSub } from "hooks/useHandleSub"
import { useMySubArr } from "hooks/useMySubArr"
import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"

export const TestPage = () => {
  return <div className="App"></div>
}
