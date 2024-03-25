import { CommunityBox } from "components/Creator/CommunityBox"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import React from "react"

export const PostPage = () => {
  return (
    <div>
      <CommunityBox isPost={false} />
      <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
      <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
      <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
      <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
      <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
    </div>
  )
}
