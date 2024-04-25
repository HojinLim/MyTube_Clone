import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_LATER } from "apollo/mutation"
import toast, { Toaster } from "react-hot-toast"
import { IconButton, Button } from "@mui/material"
import { COLOR_LIGHT_BLACK } from "config/constants"
import { COLOR_TRANSPARENT } from "config/constants"
import { COLOR_BLUE_600 } from "config/constants"
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
        toast((t) => (
          <span>
            나중에 볼 동영상에 저장됨
            <Button
              style={{ color: COLOR_BLUE_600, background: "#00ff0000" }}
              onClick={() => toast.dismiss(t.id)}
            >
              닫기
            </Button>
          </span>
        ))
        refetch()
      },
      onError: (error) => {
        toast((t) => (
          <span>
            나중에 볼 동영상 해제
            <Button
              style={{ color: COLOR_BLUE_600, background: COLOR_TRANSPARENT }}
              onClick={() => toast.dismiss(t.id)}
            >
              닫기
            </Button>
          </span>
        ))
      },
    })
  }

  const removeUpdateVideo = () => {
    let arr = globalArr.filter((value) => value !== user?.uid) // Remove user's ID from the array
    updateLater({
      variables: { id: id, later_users: arr },
      onCompleted: () => {
        toast((t) => (
          <span>
            나중에 볼 동영상 삭제 완료
            <Button
              style={{ color: "#30a9d9", background: "#00ff0000" }}
              onClick={() => toast.dismiss(t.id)}
            >
              닫기
            </Button>
          </span>
        ))

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
