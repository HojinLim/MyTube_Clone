import { useMutation } from "@apollo/client"
import { CREATE_COMMENT } from "apollo/mutation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useCreateComment = ({
  uid,
  subId,
  contents,
  isParent,
  refetchComments,
  setVisibleText,
  keyword,
}) => {
  const [result, setResult] = useState("")
  const [createComment] = useMutation(CREATE_COMMENT)
  const activateCreate = () => {
    console.log("작동됨")
    createComment({
      variables: {
        created_user: uid,
        created_youtube: subId,
        contents: contents,
        isParent: isParent,
      },
      onCompleted: (result) => {
        toast.success(`${keyword} 작성 완료!`)
        // alert(`${keyword} 작성 완료!`)
        setResult(result)
        refetchComments()
        setVisibleText("")
      },
      onError: (e) => {
        console.log(e)
      },
    })
  }

  return { activateCreate, result }
}
