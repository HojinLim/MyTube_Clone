import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { UPDATE_COMMENT_LIKE } from "apollo/mutation"
import { UPDATE_COMMUNITY_LIKE } from "apollo/mutation"
import { UPDATE_COMMUNITY_DISLIKE } from "apollo/mutation"
import { UPDATE_COMMENT_DISLIKE } from "apollo/mutation"
import { UPDATE_DISLIKE } from "apollo/mutation"
import { UPDATE_LIKE } from "apollo/mutation"
import React, { useEffect, useState } from "react"

const useHandleLike = ({ type, like_users, dislike_users, refetch, user, id }) => {
  const [updateLike, { loading: likeLoading, called: likeCalled }] = useMutation(UPDATE_LIKE)
  const [updateDislike, { loading: dislikeLoading, called: dislikeCalled }] =
    useMutation(UPDATE_DISLIKE)
  const [updateCommentLike, { loading: commentLikeLoading, called: commentLikeCalled }] =
    useMutation(UPDATE_COMMENT_LIKE)
  const [updateCommentDislike, { loading: commentDislikeLoading, called: commentDislikeCalled }] =
    useMutation(UPDATE_COMMENT_DISLIKE)
  const [updateCommunityLike, { loading: communityLikeLoading, called: communityLikeCalled }] =
    useMutation(UPDATE_COMMUNITY_LIKE)
  const [
    updateCommunityDislike,
    { loading: communityDislikeLoading, called: communityDislikeCalled },
  ] = useMutation(UPDATE_COMMUNITY_DISLIKE)

  let updateLikeHandler
  let updateDislikeHandler
  if (type == "video") {
    updateLikeHandler = updateLike
    updateDislikeHandler = updateDislike
  } else if (type == "comment") {
    updateLikeHandler = updateCommentLike
    updateDislikeHandler = updateCommentDislike
  } else if (type == "community") {
    updateLikeHandler = updateCommunityLike
    updateDislikeHandler = updateCommunityDislike
  }

  const [likeArr, setLikeArr] = useState([])
  const [isLikeAdded, setLikeAdded] = useState(false)
  const [dislikeArr, setDislikeArr] = useState([])
  const [isDisLikeAdded, setDisLikeAdded] = useState(false)
  useEffect(() => {
    console.log(like_users)
    const tempLikeArr = like_users?.map((data) => data.id)
    console.log(tempLikeArr)
    setLikeArr(tempLikeArr)
    const isStoredLike = like_users?.some((data) => data.id === user?.uid)
    setLikeAdded(isStoredLike)

    const tempDislikeArr = dislike_users?.map((data) => data.id)
    setDislikeArr(tempDislikeArr)
    const isStoredDislike = dislike_users?.some((data) => data.id === user?.uid)
    setDisLikeAdded(isStoredDislike)
  }, [like_users, dislike_users])
  useEffect(() => {
    if (
      (commentLikeCalled && !commentLikeLoading) ||
      (likeCalled && !likeLoading) ||
      (dislikeCalled && !dislikeLoading) ||
      (commentDislikeCalled && !commentDislikeLoading) ||
      (communityLikeCalled && !communityLikeLoading) ||
      (communityDislikeCalled && !communityDislikeLoading)
    ) {
      const tempLikeArr = like_users?.map((data) => data.id)
      console.log(tempLikeArr)
      setLikeArr(tempLikeArr)
      const isStoredLike = like_users?.some((data) => data.id === user?.uid)
      setLikeAdded(isStoredLike)

      const tempDislikeArr = dislike_users?.map((data) => data.id)
      setDislikeArr(tempDislikeArr)
      const isStoredDislike = dislike_users?.some((data) => data.id === user?.uid)
      setDisLikeAdded(isStoredDislike)
    }
    console.log("hi")
  }, [like_users, dislike_users, refetch])

  const addLikeHandler = (array, param, func) => {
    const updatedArr = [...array, user.uid]
    console.log(array)
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
