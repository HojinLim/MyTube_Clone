import React, { useCallback, useEffect, useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import person from "assets/images/person.png"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router-dom"
// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import { timeForBetween } from "functions/timeForBetween"
import { getAverageRGBFromJpgUrl } from "functions/getAverageRGBFromJpgUrl"
import { rgbToHex } from "functions/rbgToHex"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import useUpdateLater from "hooks/useUpdateLater"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { Skeleton } from "@mui/material"
import useHandleLike from "hooks/useHandleLike"

export const PlayListSide = (props) => {
  const { datas, length, sideTitle, refetch, loading } = props
  console.log(props)

  const navigate = useNavigate()
  const [color, setColor] = useState(null)
  const [gradientBackground, setGradientBackground] = useState("")
  const [isLike, setIsLike] = useState(false)
  const { id, thumbnail, title, createdBy, created_at, later_users, like_users, dislike_users } =
    datas ?? {}
  const user = useRecoilValue(accountState)
  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch: refetch,
    user: user,
    id: id,
  })

  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "video",
    like_users: like_users,
    dislike_users: dislike_users,
    refetch: refetch,
    user: user,
    id: id,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!datas) return
        const avgRGB = await getAverageRGBFromJpgUrl(
          process.env.REACT_APP_BACKEND_URL_UPLOAD + thumbnail?.url
        )
        setColor(avgRGB)
      } catch (error) {
        console.error("Error fetching average RGB:", error)
      }
    }

    fetchData()
  }, [thumbnail])

  useEffect(() => {
    if (location.pathname.includes("like")) {
      setIsLike(true)
    } else if (location.pathname.includes("like")) {
      setIsLike(false)
    }
  }, [])

  return (
    <div
      className="later_outer"
      style={{
        backgroundColor: color && rgbToHex(color?.r, color?.g, color?.b),
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div className="later_inner_outer">
          <div
            component="section"
            style={{
              padding: "20px",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
              <img
                className="pointerlable"
                onClick={() => {
                  navigate(`/watch/${id}`)
                  window.location.reload()
                }}
                src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumbnail?.url}
                style={{
                  backgroundColor: "wheat",
                  width: "100%",
                  maxWidth: "336px",
                  maxHeight: "200px",

                  borderRadius: "20px",
                }}
              />
            )}
          </div>
          <div className="playSide-info-container">
            <Typography color={"white"} variant="h6" fontWeight={"800"} marginBottom={"15px"}>
              {sideTitle}
            </Typography>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxHeight: "40px",

                  overflow: "auto",
                }}
              >
                <Typography color={"white"} variant="body2">
                  {createdBy}
                </Typography>
                <Box display={"flex"} flexDirection={"column"}>
                  <div style={{ display: "flex", textOverflow: "ellipsis", overflow: "auto" }}>
                    <Typography color={"white"} variant="caption">
                      동영상 {length}개
                    </Typography>
                    <Typography color={"white"} margin={"0px 5px"} variant="caption">
                      조회수 없음
                    </Typography>
                    <Typography color={"white"} variant="caption" textOverflow={"ellipsis"}>
                      {timeForBetween(created_at)}에 업데이트됨
                    </Typography>
                  </div>
                </Box>
              </div>
            </div>
            {console.log(isLike)}
            <CustomIconMenu
              style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                maxWidth: "30px",
                maxHeight: "30px",
                // color: "white",
              }}
              iconButton={<MoreVertIcon />}
              menuItems={[
                {
                  icon: <MoreVertIcon />,
                  text: isLike ? "좋아요 목록에서 삭제" : "나중에 보기 삭제",
                  onClick: () => {
                    if (!isLike) {
                      addLaterVideoHandler()
                    } else {
                      clickLike()
                    }
                  },
                },
              ]}
            />
          </div>
        </div>
        {/* 모두재생, 셔플 */}
        <div className="playSide-btn-container" component="section">
          <Button
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "30px",
              margin: "auto 15px",
              backgroundColor: "white",
              maxWidth: "450px",
              maxHeight: "40px",
            }}
            variant="contained"
            color="primary"
          >
            <PlayArrowIcon />
            모두 재생
          </Button>
          <Button
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "30px",
              margin: "auto 15px",
              color: "white",
              maxWidth: "450px",
              maxHeight: "40px",
            }}
            variant="contained"
            color="primary"
          >
            <ShuffleIcon />
            셔플
          </Button>
        </div>
      </div>
    </div>
  )
}
