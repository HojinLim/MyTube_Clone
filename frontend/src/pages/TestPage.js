import { dummyData } from "dummy"
import { getAverageRGBFromJpgUrl } from "functions/getAverageRGBFromJpgUrl"
import person from "assets/images/person.png"
import logo from "assets/images/logos/logo.png"
import React, { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { IconButton, Button } from "@mui/material"
import { COLOR_LIGHT_BLACK } from "config/constants"
import SimpleDialog from "components/common/SimpleDialog"
import NoResultsPage from "components/Search/NoResult"

import { useMicPermission } from "hooks/useMicPermission"
export const TestPage = () => {
  const { hasPermission, getHasMicPermission, getMicPermission } = useMicPermission()
  console.log(hasPermission)
  return (
    <div>
      <button
        onClick={() => {
          getMicPermission()
        }}
      >
        ff
      </button>
    </div>
  )
}
