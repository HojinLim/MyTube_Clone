import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"

import UploadModal from "components/Studio/UploadModal"
import { Dashboard } from "@mui/icons-material"
import SideBar from "components/SideBar"
import Sidebar from "studio/Sidebar"
import { Dashboard as Dash } from "studio/Dashboard"

export const StudioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  return (
    <div style={{ marginTop: "80px", display: "flex" }}>
      <UploadModal />
      <Sidebar />

      <Dash />
    </div>
  )
}
