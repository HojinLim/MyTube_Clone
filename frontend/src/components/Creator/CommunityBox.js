import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

import { Typography, Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"

// 아이콘
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"

import { timeForBetween } from "functions/timeForBetween"
import { useLazyQuery, useMutation } from "@apollo/client"
import { GET_COMMUNITY_BY_ID } from "apollo/query"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import useHandleLike from "hooks/useHandleLike"
import { copyCurrentUrl } from "functions/copyCurrentUrl"
import { DELETE_COMMUNITY } from "apollo/mutation"
import toast from "react-hot-toast"
import SimpleDialog from "components/common/SimpleDialog"
export const CommunityBox = (props) => {
  const location = useLocation()
  const [detailed, setDetailed] = useState(false)
  const [community, setCommunity] = useState(null)
  const [isParam, setIsParm] = useState(false)
  const [clickCancel, setClickCancel] = useState(false)
  const params = useParams()
  const user = useRecoilValue(accountState)
  const [getCommunityById, { data, refetch, loading }] = useLazyQuery(GET_COMMUNITY_BY_ID)
  const [deleteCommunity, {}] = useMutation(DELETE_COMMUNITY)
  console.log(props)
  useEffect(() => {
    if (props?.data) {
      setCommunity(props.data)
    } else if (!props?.data && params) {
      setIsParm(true)
      getCommunityById({ variables: { id: params?.id } })
    }
  }, [props])
  useEffect(() => {
    console.log(props?.data)
    if (!props?.data && data && !loading) {
      setCommunity(data.community)
    }
  }, [data, community])
  console.log(community)
  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "community",
    like_users: community?.like_users,
    dislike_users: community?.dislike_users,
    refetch: refetch ?? props?.refetch(),
    user: user,
    id: community?.id,
  })
  useEffect(() => {
    location.pathname.startsWith("/post") ? setDetailed(true) : setDetailed(false)
  }, [])
  // console.log()
  const navigate = useNavigate()
  const deleteCommunityHanlder = () => {
    console.log(community?.id)
    deleteCommunity({
      variables: { id: community?.id },
      onCompleted: () => {
        if (!detailed) props?.refetch()
        toast.success("삭제 완료")
        if (location.pathname.startsWith("/post")) navigate(-1)
      },
    })
  }
  return (
    <div className="community-box-container">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          height: "10%",
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar src={community?.created_user?.profileImage} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 10px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Typography style={{ marginRight: "10px" }} variant="caption">
                {community?.created_user?.username ?? ""}
              </Typography>
              <Typography variant="caption">
                {timeForBetween(community?.created_at) ?? ""}
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <CustomIconMenu
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              maxWidth: "30px",
              maxHeight: "30px",
              color: "white",
            }}
            iconButton={<MoreVertIcon />}
            menuItems={[
              // {
              //   icon: <EditOutlinedIcon />,
              //   text: "수정",
              //   onClick: () => {},
              // },
              {
                icon: <DeleteOutlineOutlinedIcon />,
                text: "삭제",
                onClick: () => {
                  setClickCancel(true)
                },
              },
            ]}
          />
        </div>
      </div>
      {clickCancel && (
        <SimpleDialog
          initState
          title="정말 삭제하시겠습니까?"
          cancelText="취소"
          confirmText="삭제"
          execute={() => {
            setClickCancel(false)
            deleteCommunityHanlder()
          }}
          cancel={() => {
            setClickCancel(false)
          }}
        />
      )}
      {/* 2*/}

      <div
        style={{
          borderRadius: "30px",
          width: "80%",
          height: "80%",
          objectFit: "cover",
          alignSelf: "center",
          margin: "25px 0px",
        }}
      >
        <div style={{ height: "30%" }}>
          <Typography variant="body1">{community?.contents}</Typography>
        </div>

        <img
          className="clickable"
          onClick={() => {
            if (!detailed) {
              navigate(`/post/${community?.id}`)
            }
          }}
          style={{ height: "100%", width: "50%", maxHeight: "600px" }}
          src={process.env.REACT_APP_BACKEND_URL_UPLOAD + community?.photo[0]?.url ?? ""}
          width={"100%"}
        />
      </div>
      <div style={{ display: "flex", height: "10%" }}>
        <IconButton style={{ color: "black" }} onClick={clickLike}>
          {isLikeAdded ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
          <Typography variant="caption">{community?.like_users?.length}</Typography>
        </IconButton>
        <IconButton style={{ color: "black" }} onClick={clickDislike}>
          {isDisLikeAdded ? <ThumbDownRoundedIcon /> : <ThumbDownOffAltIcon />}
        </IconButton>
        <IconButton
          disabled
          style={{ color: "black", margin: "0px 15px" }}
          onClick={() => copyCurrentUrl()}
        >
          <ReplyOutlinedIcon />
        </IconButton>
        {!isParam && (
          <IconButton style={{ color: "black" }} onClick={() => navigate(`/post/${community?.id}`)}>
            <CommentOutlinedIcon fontSize="small" />

            <Typography variant="caption">{community?.comments?.length}</Typography>
          </IconButton>
        )}
      </div>
    </div>
  )
}
