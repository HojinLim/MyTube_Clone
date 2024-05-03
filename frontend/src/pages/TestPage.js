import { useMediaQuery } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"

export const TestPage = () => {
  const [text, setText] = useState()
  const call = useCallback(() => {
    console.log(text)
  }, [text])

  useEffect(() => {
    call()
  }, [call])
  console.log(Math.ceil(462 / 20))

  return <div className="youtube-shorts-slider"></div>
}
