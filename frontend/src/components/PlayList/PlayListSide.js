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

export const PlayListSide = ({ datas, length, sideTitle }) => {
  const navigate = useNavigate()
  const [color, setColor] = useState(null)
  const [gradientBackground, setGradientBackground] = useState("")

  const { id, thumbnail, title, createdBy, created_at } = datas ?? {}

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
          </div>
          <div
            // component="section"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              marginLeft: "40px",
              margin: "20px 0px",
            }}
          >
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
                  icon: <MoreVertIcon />,
                  text: "나중에 보기 삭제",
                  onClick: () => {},
                },
              ]}
            />
          </div>
        </div>
        {/* 모두재생, 셔플 */}
        <div
          component="section"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            justifyContent: "space-between",
            display: "flex",
            margin: "auto",
          }}
        >
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
