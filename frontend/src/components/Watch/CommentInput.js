import React, { useEffect, useMemo, useRef, useState } from "react"

import Avatar from "@mui/material/Avatar"

import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import EmojiPicker from "emoji-picker-react"
//Icons

import MoodIcon from "@mui/icons-material/Mood"
import SortIcon from "@mui/icons-material/Sort"

import TextField from "@mui/material/TextField"
import { useMutation } from "@apollo/client"
import { CREATE_COMMENT } from "apollo/mutation"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { UPDATE_COMMENTS } from "apollo/mutation"
import toast from "react-hot-toast"
export const CommentInput = ({
  keyword,
  subId,
  refetchComments,
  setOpenInput,
  parentData,
  videoOwner,
  isPost,
}) => {
  // console.log(isPost)
  // console.log(videoOwner)
  const [visibleText, setVisibleText] = useState("")
  const [realText, setRealText] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [textAdded, setTextAdded] = useState(false)
  const [input, setInput] = useState(false)
  const { id, replies, isParent, username } = parentData ?? {}
  console.log(parentData)
  // console.log(isParent)
  const toggleEmojiPicker = () => {
    // WARNING: 일단 막아둠..
    return
    setIsEmojiPickerOpen((prev) => !prev) // 이전 상태의 반대 값을 설정하여 토글
  }

  const [createComment] = useMutation(CREATE_COMMENT)
  const [updateComment] = useMutation(UPDATE_COMMENTS)

  // 유저 정보 가져오기

  const user = useRecoilValue(accountState)

  const onCancelSubmit = () => {
    setVisibleText("")
    setInput(false)
    if (keyword == "답글") setOpenInput(false)
  }

  const onSubmitComment = () => {
    console.log("submit")
    // 댓글
    if (keyword == "댓글") {
      const variables = {
        created_user: user?.uid,
        contents: visibleText,
        isParent: true,
        ownerId: videoOwner,
      }

      if (!isPost) {
        variables.created_youtube = subId
      } else {
        variables.created_community = subId
      }

      createComment({
        variables,
        onCompleted: () => {
          // console.log(res)
          toast.success(`${keyword} 작성 완료!`)

          refetchComments()
          setVisibleText("")
        },
      })
    } else if (keyword == "답글") {
      if (visibleText.startsWith(parentData?.created_user?.username) && !isParent) {
        // 답글의 답변 - @username hi
      } else {
        // 댓글의 답글
      }
      const variables = {
        created_user: user?.uid,
        contents: visibleText,
        isParent: false,
      }

      if (!isPost) {
        variables.created_youtube = subId
      } else {
        variables.created_community = subId
      }

      createComment({
        variables,
        onCompleted: (res) => {
          console.log(res)

          toast.success(`${keyword} 작성 완료!`)

          if (isParent) {
            const arr = []
            replies?.map((value) => {
              arr.push(value.id)
            })

            arr.push(res?.createComment?.comment?.id)

            updateComment({
              variables: { id: id, replies: arr },
              onCompleted: () => {
                toast.success("업데이트 완료")
                refetchComments()
                onCancelSubmit()
              },
            })

            refetchComments()
            setVisibleText("")
          } else {
            const arr = []
            parentData?.root_comment?.replies?.map((value) => {
              arr.push(value.id)
            })

            arr.push(res?.createComment?.comment?.id)

            updateComment({
              variables: { id: parentData?.root_comment?.id, replies: arr },
              onCompleted: () => {
                toast.success("업데이트 완료")
                refetchComments()
                onCancelSubmit()
              },
            })

            refetchComments()
            setVisibleText("")
          }
        },
      })
    }
  }

  useEffect(() => {
    if (!isParent && !textAdded && keyword == "답글") {
      // 컴포넌트가 처음 렌더링될 때만 실행됩니다.
      setVisibleText(`@${parentData?.created_user?.username} `)
      setTextAdded(true)
    }
  }, [textAdded])
  const handleChange = (e) => {
    console.log(parentData)
    const newText = e.target.value

    setVisibleText(newText)
  }

  return (
    <div style={{ display: "flex", marginBottom: "30px" }}>
      <Avatar
        alt="Remy Sharp"
        src={user?.picture}
        style={{ marginRight: "10px", width: "28px", height: "28px" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={visibleText}
          onChange={handleChange}
          id="standard-basic"
          label={`${keyword} 추가...`}
          variant="standard"
          fullWidth
          onFocus={() => {
            setIsEmojiPickerOpen(false)
            setInput(true)
          }}
        />
        {input && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <IconButton style={{ color: "black" }} onClick={toggleEmojiPicker}>
                <MoodIcon />
              </IconButton>
              {isEmojiPickerOpen && (
                <div style={{ position: "absolute", top: "100%", zIndex: 10 }}>
                  <EmojiPicker
                    open={true}
                    previewConfig={{ defaultCaption: true }}
                    height={300}
                    onEmojiClick={(emoji, e) => {
                      console.log(typeof emoji.unified)
                      console.log(emoji.unified)
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <Button
                onClick={onCancelSubmit}
                sx={{
                  borderRadius: "20px",
                  maxHeight: "40px",
                }}
              >
                취소
              </Button>
              <Button
                onClick={onSubmitComment}
                // variant="contained"
                sx={{
                  borderRadius: "20px",
                  maxHeight: "40px",
                  backgroundColor: "#eee",
                }}
              >
                {keyword}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
