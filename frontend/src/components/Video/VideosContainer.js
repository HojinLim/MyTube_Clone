import React from "react"

import { VideoContainer } from "./VideoContainer"
import { dummyData } from "dummy"
import { styled } from "@mui/material/styles"
import { MenuSelector } from "components/common/MenuSelector"
import { StyledGrid } from "styles/globalStyle"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()

  React.useEffect(() => {
    setDummy(dummyData)
  }, [dummyData])

  return (
    <>
      <StyledGrid>
        {dummyData?.map((data, key) => (
          <VideoContainer key={key} data={data} />
        ))}
      </StyledGrid>
    </>
  )
}
