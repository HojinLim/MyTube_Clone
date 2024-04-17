import { useLazyQuery } from "@apollo/client"
import { FIND_USER_ID_BY_NAME } from "apollo/query"
import React, { useEffect } from "react"

export const useFindUserData = ({ nickname }) => {
  const [findUser, { data: userData }] = useLazyQuery(FIND_USER_ID_BY_NAME)
  useEffect(() => {
    const getUserData = async () => {
      try {
        findUser({ variables: { username: nickname } })
        console.log("찾는중")
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    getUserData()
  }, [findUser, nickname])
  return { userData }
}
