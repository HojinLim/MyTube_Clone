import React, { useState } from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import person from "assets/images/person.png"
import { Button } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { openUploadState } from "atom/openUploadState"
import ContentsTab from "./ContentsTab"
import { NoContents } from "./NoContents"
import ContentsTable from "./ContentsTable"

export const ContentsItem = () => {
  const [data, setData] = useState([
    { id: 1, name: "Item 1", selected: false },
    { id: 2, name: "Item 2", selected: false },
    { id: 3, name: "Item 3", selected: false },
    // Add more data as needed
  ])

  const handleCheckboxChange = (id) => {
    setData(data.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const handleAllCheckboxChange = () => {
    setData(data.map((item) => ({ ...item, selected: !isAllSelected })))
  }

  const isAllSelected = data.every((item) => item.selected)

  const setOpen = useSetRecoilState(openUploadState)
  return (
    <div>
      <Typography variant="h5" fontWeight={"700"} style={{ margin: "15px" }}>
        채널 콘텐츠
      </Typography>
      <ContentsTab />

      <ContentsTable />
      {/* <NoContents /> */}
    </div>
  )
}
