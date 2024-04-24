import { ShortsContainerr } from "components/shorts/ShortsContainerr"
import { dummyData } from "dummy"
import { getAverageRGBFromJpgUrl } from "functions/getAverageRGBFromJpgUrl"
import person from "assets/images/person.png"
import logo from "assets/images/logos/logo.png"
import React, { useEffect } from "react"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import toast, { Toaster } from "react-hot-toast"
export const TestPage = () => {
  const notify = () => toast("Here is your toast.")
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  )
}
