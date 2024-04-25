import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import TextField from "@mui/material/TextField"

import SortIcon from "@mui/icons-material/Sort"
import CloseIcon from "@mui/icons-material/Close"

import { CommonIconButton } from "components/common/CommonIconButton"
import Divider from "@mui/material/Divider"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { CommentInput } from "components/Watch/CommentInput"
import { ShortsDesItem } from "./ShortsDesItem"
import { formatDateArray } from "functions/formatDateArray"
export const ShortsCommentContainer = (props) => {
  const user = useRecoilValue(accountState)
  const {
    video,
    comments,
    setOpenComment,
    openInput,
    setOpenInput,
    openComment,
    commentRefetch,
    desMode,
    setDesMode,
  } = props
  const [comment, setComment] = useState(null)
  const [handleToggle, setHandleToggle] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    setComment(comments)
  }, [comments])
  const time = formatDateArray(video?.created_at) ?? []

  return (
    <div
      style={{
        scrollSnapAlign: "start",
        width: "400px",
        maxHeight: "700px",
        border: "1px solid #e0e0e0",
        borderRadius: "15px",

        overflow: "scroll",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: "5px", height: "100%" }}>
        {/* 상단  */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "10px",
            height: "10%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Typography variant="h6" fontWeight={"600"}>
              {!desMode ? "댓글" : "설명"}
            </Typography>
            {!desMode ? (
              <Typography fontWeight={"600"} color={"gray"}>
                {comments?.length}
              </Typography>
            ) : (
              <Divider />
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {!desMode && (
              <CustomIconMenu
                iconButton={<SortIcon />}
                menuItems={[
                  {
                    text: "인기 댓글순",
                    onClick: () => {},
                  },
                  {
                    text: "최신순",
                    onClick: () => {},
                  },
                ]}
              />
            )}

            <CommonIconButton
              onClick={() => {
                setOpenComment(false)
              }}
              background="#00ff0000"
              color="gray"
              icon={<CloseIcon />}
            />
          </div>
        </div>

        {console.log(comments)}
        {/* 댓글란 */}
        <div style={{ height: "80%", overflow: "scroll" }}>
          {!desMode &&
            comments
              ?.filter((value) => value?.isParent)
              .map((data, key) => (
                <div key={key}>
                  <UserFeedBackContainer
                    key={`parent-${key}`}
                    identify={key}
                    comment={data}
                    fixIsParent={true}
                    refetchComments={commentRefetch}
                    handleToggle={handleToggle}
                    setHandleToggle={setHandleToggle}
                  />
                  {console.log(data?.replies)}
                  {handleToggle?.includes(key) &&
                    data?.replies.map((value, subKey) => (
                      <UserFeedBackContainer
                        key={`child-${subKey}`}
                        comment={value}
                        fixIsParent={false}
                        refetchComments={commentRefetch}
                      />
                    ))}
                </div>
              ))}
        </div>

        {/* 댓글 입력란 */}
        {!desMode && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid #eee",
              width: "100%",
              padding: "10px 5px",
              height: "15%",
            }}
          >
            <CommentInput
              keyword={"댓글"}
              subId={video?.id}
              refetchComments={commentRefetch}
              videoOwner={video?.created_user?.id}
            />
          </div>
        )}
        {desMode && (
          <>
            <Typography style={{ marginBottom: "10px", marginLeft: "10px" }} variant="body1">
              {video?.description}
            </Typography>

            <Divider />
          </>
        )}
      </div>

      {desMode && (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <ShortsDesItem above={video?.like_users?.length} bottom="좋아요 수" />
          <ShortsDesItem above={video?.views} bottom="조회수" />
          <ShortsDesItem above={`${time[1]}월 ${time[2]}일`} bottom={`${time[0]}년`} />
        </div>
      )}
    </div>
  )
}
