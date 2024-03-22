import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"

import UploadModal from "components/Studio/UploadModal"
import { Dashboard } from "@mui/icons-material"

import Sidebar from "studio/Sidebar"

import { ContentsItem } from "studio/ContentsItem"
import { DashboardItem } from "studio/DashboardItem"
import { useRecoilState } from "recoil"
import { studioMenuState } from "atom/studioMenuState"

export const StudioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [studioState, setStudioState] = useRecoilState(studioMenuState)

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar />
      <UploadModal />

      {studioState === "dashboard" ? <DashboardItem /> : <ContentsItem />}
    </div>
  )
}
