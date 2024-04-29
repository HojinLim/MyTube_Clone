import React, { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"

import UploadModal from "components/Studio/UploadModal"
import { Dashboard } from "@mui/icons-material"

import Sidebar from "studio/Sidebar"

import { ContentsItem } from "studio/ContentsItem"
import { DashboardItem } from "studio/DashboardItem"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { studioMenuState } from "atom/studioMenuState"
import { studioPageState } from "atom/studioPageState"
import { accountState } from "atom/accountState"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const StudioPage = () => {
  const navi = useNavigate()
  const user = useRecoilValue(accountState)
  const [selectedItem, setSelectedItem] = useState(null)
  const [studioState, setStudioState] = useRecoilState(studioMenuState)
  const setStudio = useSetRecoilState(studioPageState)
  useEffect(() => {
    setStudio(true)
    return () => {
      setStudio(false)
    }
  }, [])
  if (!user) {
    navi("/")

    return toast.error("로그인 후 이용해주세요!")
  }
  return (
    <div style={{ display: "flex", position: "relative", width: "100%" }}>
      <Sidebar />
      <UploadModal />

      {studioState === "dashboard" ? <DashboardItem /> : <ContentsItem />}
    </div>
  )
}
