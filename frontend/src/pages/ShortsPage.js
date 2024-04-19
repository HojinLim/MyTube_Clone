import React, { useEffect, useState } from "react"

import { ShortsItem } from "components/shorts/ShortsItem"

export const ShortsPage = () => {
  return (
    <div
      style={{
        maxHeight: "100vh",
        overflow: "scroll",
        scrollSnapType: "y mandatory",
        justifyContent: "center",
        marginTop: "140px",
        display: "grid",
      }}
    >
      <ShortsItem />
      <ShortsItem />
    </div>
  )
}
