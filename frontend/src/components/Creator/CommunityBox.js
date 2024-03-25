import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import { IconButton, Button } from "@mui/material"
import person from "assets/images/person.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { useNavigate } from "react-router-dom"
export const CommunityBox = ({ isPost }) => {
  const navigate = useNavigate()
  const test = "test"
  return (
    <div className="community-container">
      <div>
        <img src={person} width={"50px"} height={"50px"} m />
      </div>
      <div style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
        <div style={{ display: "flex" }}>
          <Typography variant="caption">주인장</Typography>
          <Typography variant="caption" style={{ marginLeft: "5px" }}>
            3일 전
          </Typography>
        </div>

        <Typography variant="body1">
          blarblarblarblarblarblarblarblarblarblarblarblarblarblarblaarblarblarblaczccacar
        </Typography>
        <div style={{ borderRadius: "30px", width: "100%" }}>
          <img src={person} width={"100%"} />
        </div>
        <div style={{ display: "flex" }}>
          <IconButton style={{ color: "black" }}>
            <ThumbUpOffAltIcon />
            <Typography variant="caption">100</Typography>
          </IconButton>
          <IconButton style={{ color: "black" }}>
            <ThumbDownOffAltIcon />
          </IconButton>
          <IconButton style={{ color: "black", margin: "0px 15px" }}>
            <ReplyOutlinedIcon />
          </IconButton>
          <IconButton style={{ color: "black" }} onClick={() => navigate(`/post/${test}`)}>
            {isPost && (
              <>
                <CommentOutlinedIcon fontSize="small" />

                <Typography variant="caption">122</Typography>
              </>
            )}
          </IconButton>
        </div>
      </div>
      <div className="community-menu">
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  )
}
