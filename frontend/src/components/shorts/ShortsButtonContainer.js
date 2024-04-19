import React from "react"
import { Container, Avatar, Box } from "@mui/material"

import ShareIcon from "@mui/icons-material/Share"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CommentIcon from "@mui/icons-material/Comment"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import NotesIcon from "@mui/icons-material/Notes"

import { CommonIconButton } from "components/common/CommonIconButton"

import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import useHandleLike from "hooks/useHandleLike"
import useUpdateLater from "hooks/useUpdateLater"

export const ShortsButtonContainer = (props) => {
  const { id, comments, good, setGood, bad, setBad, setOpenComment, video, refetch } = props
  const { like_users, dislike_users, later_users } = video ?? {}
  const user = useRecoilValue(accountState)
  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "video",
    like_users,
    dislike_users,
    refetch,
    user: user,
    id,
  })
  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch,
    user: user,
    id: id,
  })

  console.log(video)
  console.log(comments)
  // console.log(isLikeAdded)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        margin: "15px",
        gap: "15px",
      }}
    >
      {/* 아이템 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* 좋아요 버튼 */}
        <CommonIconButton
          onClick={clickLike}
          background={isLikeAdded ? "black" : undefined}
          color={isLikeAdded ? "white" : undefined}
          icon={<ThumbUpIcon />}
        />
        <div>{video?.like_users?.length}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {/* 싫어요 버튼 */}
        <CommonIconButton
          onClick={clickDislike}
          background={isDisLikeAdded ? "black" : undefined}
          color={isDisLikeAdded ? "white" : undefined}
          icon={<ThumbDownIcon />}
        />
        <div>{video?.dislike_users?.length}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <CommonIconButton onClick={() => setOpenComment((prev) => !prev)} icon={<CommentIcon />} />
        <div>{comments?.length}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <CommonIconButton icon={<ShareIcon />} />
        <div>공유</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <CustomIconMenu
          style={{ background: "#eee" }}
          iconButton={<MoreVertIcon />}
          menuItems={[
            {
              icon: <NotesIcon />,
              text: "설명",
              onClick: () => {
                setOpenComment(true)
              },
            },
            {
              icon: isAdded ? <DoDisturbIcon /> : <PlaylistAddIcon />,
              text: isAdded ? "나중에 볼 동영상에서 해제" : "나중에 볼 동영상에 저장",
              onClick: addLaterVideoHandler,
            },
            {
              icon: <LiveHelpOutlinedIcon />,
              text: "의견 보내기",
              onClick: () => {},
            },
          ]}
        />

        <Avatar className="clickable" src={user?.picture} />
      </div>
    </div>
  )
}
