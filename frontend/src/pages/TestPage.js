import React, { useEffect } from "react"
import ArchiveIcon from "@mui/icons-material/Archive"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useLazyQuery } from "@apollo/client"
import { GET_COMMENTS_BY_ID } from "apollo/query"
import { useNavigate } from "react-router-dom"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
export const TestPage = () => {
  return (
    <iframe
      width="1280"
      height="720"
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="체리가 미국 어린이집에서 이 한국 동요를 불렀다가 크게 혼났어요"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  )
}
