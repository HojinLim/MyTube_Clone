import React, { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"

import UploadModal from "components/Studio/UploadModal"
import { Dashboard } from "@mui/icons-material"

import Sidebar from "studio/Sidebar"

import { ContentsItem } from "studio/ContentsItem"
import { DashboardItem } from "studio/DashboardItem"
import { useRecoilState, useSetRecoilState } from "recoil"
import { studioMenuState } from "atom/studioMenuState"
import { studioPageState } from "atom/studioPageState"

export const StudioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [studioState, setStudioState] = useRecoilState(studioMenuState)
  const setStudio = useSetRecoilState(studioPageState)
  useEffect(() => {
    setStudio(true)
    return () => {
      setStudio(false)
    }
  }, [])
  return (
    <div style={{ display: "flex", position: "relative", width: "100%" }}>
      <Sidebar />
      <UploadModal />

      {studioState === "dashboard" ? <DashboardItem /> : <ContentsItem />}
    </div>
  )
}
