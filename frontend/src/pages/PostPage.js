import { CommunityBox } from "components/Creator/CommunityBox"

import React from "react"

export const PostPage = () => {
  return (
    <div
      style={{
        padding: "50px",
        alignItems: "start",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <CommunityBox />
    </div>
  )
}
