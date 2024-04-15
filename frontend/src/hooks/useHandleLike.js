import { useMutation } from "@apollo/client"
import { UPDATE_DISLIKE } from "apollo/mutation"
import { UPDATE_LIKE } from "apollo/mutation"
import React, { useEffect, useState } from "react"

const useHandleLike = ({ like_users, dislike_users, refetch, user, id }) => {
  const [updateLike] = useMutation(UPDATE_LIKE)
  const [updateDislike] = useMutation(UPDATE_DISLIKE)

  const [likeArr, setLikeArr] = useState([])
  const [isLikeAdded, setLikeAdded] = useState(null)
  const [dislikeArr, setDislikeArr] = useState([])
  const [isDisLikeAdded, setDisLikeAdded] = useState(null)

  useEffect(() => {
    const tempLikeArr = like_users?.map((data) => data.id)

    setLikeArr(tempLikeArr)
    const isStoredLike = like_users?.some((data) => data.id === user?.uid)
    setLikeAdded(isStoredLike)

    const tempDislikeArr = dislike_users?.map((data) => data.id)
    setDislikeArr(tempDislikeArr)
    const isStoredDislike = dislike_users?.some((data) => data.id === user?.uid)
    setDisLikeAdded(isStoredDislike)
  }, [like_users, dislike_users, user, refetch])

  const addLikeHandler = (array, param, func) => {
    const updatedArr = [...array, user.uid]
    console.log(id + "의" + "데이터를 추천누릅니다")
    func({
      variables: { id: id, [param]: updatedArr },
      onCompleted: () => {
        refetch()
      },
      onError: (error) => {
        console.error("Error adding like: ", error)
      },
    })
  }

  const removeLikeHandler = (array, param, func) => {
    const updatedArr = array.filter((value) => value !== user.uid)
    console.log("in", updatedArr)
    console.log(id + "의" + "데이터를 비추천누릅니다")
    func({
      variables: { id: id, [param]: updatedArr },
      onCompleted: () => {
        refetch()
      },
      onError: (error) => {
        console.error("Error removing like: ", error)
      },
    })
  }

  const clickLike = () => {
    console.log("likeArr", likeArr)
    console.log("isLikeAdded", isLikeAdded)
    if (isLikeAdded) {
      removeLikeHandler(likeArr, "like_users", updateLike)
    } else {
      addLikeHandler(likeArr, "like_users", updateLike)
      if (isDisLikeAdded) {
        removeLikeHandler(dislikeArr, "dislike_user", updateDislike)
      }
    }
  }

  const clickDislike = () => {
    if (isDisLikeAdded) {
      removeLikeHandler(dislikeArr, "dislike_user", updateDislike)
    } else {
      addLikeHandler(dislikeArr, "dislike_user", updateDislike)
      if (isLikeAdded) {
        removeLikeHandler(likeArr, "like_users", updateLike)
      }
    }
  }

  return { isLikeAdded, isDisLikeAdded, clickLike, clickDislike }
}

export default useHandleLike
