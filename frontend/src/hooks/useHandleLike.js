import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { UPDATE_COMMENT_LIKE } from "apollo/mutation"
import { UPDATE_COMMENT_DISLIKE } from "apollo/mutation"
import { UPDATE_DISLIKE } from "apollo/mutation"
import { UPDATE_LIKE } from "apollo/mutation"
import { FIND_USER_BY_EMAIL } from "apollo/query"
import React, { useEffect, useMemo, useState } from "react"

const useHandleLike = ({ type, like_users, dislike_users, refetch, user, id }) => {
  const [updateLike] = useMutation(UPDATE_LIKE)
  const [updateDislike] = useMutation(UPDATE_DISLIKE)
  const [updateCommentLike] = useMutation(UPDATE_COMMENT_LIKE)
  const [updateCommentDislike] = useMutation(UPDATE_COMMENT_DISLIKE)

  let updateLikeHandler
  let updateDislikeHandler
  if (type == "video") {
    updateLikeHandler = updateLike
    updateDislikeHandler = updateDislike
  } else if (type == "comment") {
    updateLikeHandler = updateCommentLike
    updateDislikeHandler = updateCommentDislike
  }

  const [likeArr, setLikeArr] = useState([])
  const [isLikeAdded, setLikeAdded] = useState(null)
  const [dislikeArr, setDislikeArr] = useState([])
  const [isDisLikeAdded, setDisLikeAdded] = useState(null)
  // console.log("hi")
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
  //like_users, dislike_users, user, refetch
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
    console.log("hi")
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
      removeLikeHandler(likeArr, "like_users", updateLikeHandler)
    } else {
      addLikeHandler(likeArr, "like_users", updateLikeHandler)
      if (isDisLikeAdded) {
        removeLikeHandler(dislikeArr, "dislike_users", updateDislikeHandler)
      }
    }
  }

  const clickDislike = () => {
    console.log("hi")
    if (isDisLikeAdded) {
      removeLikeHandler(dislikeArr, "dislike_users", updateDislikeHandler)
    } else {
      addLikeHandler(dislikeArr, "dislike_users", updateDislikeHandler)
      if (isLikeAdded) {
        removeLikeHandler(likeArr, "like_users", updateLikeHandler)
      }
    }
  }

  return { isLikeAdded, isDisLikeAdded, clickLike, clickDislike }
}

export default useHandleLike
