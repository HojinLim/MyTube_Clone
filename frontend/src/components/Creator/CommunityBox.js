import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Typography } from "@mui/material"
import { IconButton, Button } from "@mui/material"
import person from "assets/images/person.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { useNavigate } from "react-router-dom"
import { timeForBetween } from "functions/timeForBetween"
import { useLazyQuery } from "@apollo/client"
import { GET_COMMUNITY_BY_ID } from "apollo/query"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import useHandleLike from "hooks/useHandleLike"
export const CommunityBox = (props) => {
  const [community, setCommunity] = useState(null)
  const [isParam, setIsParm] = useState(false)
  const params = useParams()
  const user = useRecoilValue(accountState)
  const [getCommunityById, { data, refetch, loading }] = useLazyQuery(GET_COMMUNITY_BY_ID)

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

  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "community",
    like_users: community?.like_users,
    dislike_users: community?.dislike_users,
    refetch: refetch ?? props?.refetch,
    user: user,
    id: community?.id,
  })

  const navigate = useNavigate()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        width: "100%",
        height: "100%",
        maxHeight: "900px",
        maxWidth: "900px",
        border: "1px solid lightgray",
        borderRadius: "25px",
        padding: "20px",
      }}
    >
      {/* 1*/}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          height: "10%",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={community?.created_user?.profileImage}
            style={{ maxHeight: "40px", borderRadius: "25px" }}
          />

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
              {
                icon: <EditOutlinedIcon />,
                text: "수정",
                onClick: () => {},
              },
              {
                icon: <DeleteOutlineOutlinedIcon />,
                text: "삭제",
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
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
        <IconButton style={{ color: "black", margin: "0px 15px" }}>
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
