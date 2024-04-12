import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_LATER } from "apollo/mutation"

const useUpdateLater = ({ later_users, refetch, user, id }) => {
  const [updateLater] = useMutation(UPDATE_LATER)
  const [globalArr, setGlobalArr] = useState([])
  const [isLaterAdded, setLaterAdded] = useState(null)

  // 나중에 볼 영상 array 적용
  useEffect(() => {
    let glob = []
    later_users?.map((data) => glob.push(data.id))
    setGlobalArr(glob)
    const isStored = later_users?.find((data) => data?.id === user?.uid)
    setLaterAdded(isStored ? true : false)
    console.log(user)
  }, [later_users, user])

  const updateLaterVideo = () => {
    let arr = [...globalArr, user?.uid]
    updateLater({
      variables: { id: id, later_users: arr },
      onCompleted: () => {
        alert("재생목록 추가 완료!")
        refetch()
      },
      onError: (error) => {
        alert("재생목록 추가 실패!")
      },
    })
  }

  const removeUpdateVideo = () => {
    let arr = globalArr.filter((value) => value !== user?.uid) // Remove user's ID from the array
    updateLater({
      variables: { id: id, later_users: arr },
      onCompleted: () => {
        alert("재생목록 삭제 완료!")
        refetch()
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const addLaterVideoHandler = () => {
    if (isLaterAdded) {
      removeUpdateVideo()
    } else {
      updateLaterVideo()
    }
  }

  return { isAdded: isLaterAdded, addLaterVideoHandler }
}

export default useUpdateLater
