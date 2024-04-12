import { useLazyQuery, useMutation } from "@apollo/client"
import { UPDATE_SUB } from "apollo/mutation"
import { FIND_USER_ID_BY_ID } from "apollo/query"
import { clickTermState } from "atom/clickTermState"
import React, { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

export const useHandleSub = ({ owner_id, my_id }) => {
  const [subArr, setSubArr] = useState([])
  const [subed, setSubed] = useState()
  const [isYours, setYours] = useState(false)

  const [getUserById, { data, loading }] = useLazyQuery(FIND_USER_ID_BY_ID)
  const [updateSub, { updateLoading, updateError }] = useMutation(UPDATE_SUB)
  const setClickTerm = useSetRecoilState(clickTermState)

  const changeSubHandler = async () => {
    try {
      let updatedSubArr
      //   사이드바도 변경 되게끔
      setClickTerm(true)
      if (subed) {
        // 구독 해제
        updatedSubArr = subArr.filter((userId) => userId !== owner_id)
      } else {
        // 구독 추가
        updatedSubArr = [...subArr, owner_id]
      }

      // Call the mutation to update sub_users
      await updateSub({ variables: { id: my_id, user_id: updatedSubArr } })

      // Update local state with the updated subArr
      setSubArr(updatedSubArr)
      // Update subed state based on the updated subArr
      setSubed(updatedSubArr.includes(owner_id))
    } catch (error) {
      console.error("Error updating subscription:", error)
    }
  }
  useEffect(() => {
    owner_id == my_id ? setYours(true) : setYours(false)
    const getUserSub = async () => {
      try {
        const { data } = await getUserById({
          variables: { id: my_id },
        })

        if (data && data.users && data.users.length > 0) {
          const subUserIds = data.users[0]?.sub_users.map((value) => value?.id)
          setSubArr(subUserIds)

          setSubed(subUserIds?.includes(owner_id?.toString()))
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    getUserSub()
  }, [getUserById, my_id, owner_id])

  return { changeSubHandler, subArr, subed, isYours, data }
}
