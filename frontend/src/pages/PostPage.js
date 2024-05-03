import { useLazyQuery } from "@apollo/client"
import { GET_COMMENTS_BY_ID_COMMUNITY } from "apollo/query"
import { GET_COMMENTS_BY_ID } from "apollo/query"
import { CommunityBox } from "components/Creator/CommunityBox"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import { CommentInput } from "components/Watch/CommentInput"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const PostPage = () => {
  const params = useParams()
  const [handleToggle, setHandleToggle] = useState([])
  const [
    getCommentsById,
    { loading: commentsLoading, error: commentError, data: commentData, refetch: refetchComments },
  ] = useLazyQuery(GET_COMMENTS_BY_ID_COMMUNITY)

  useEffect(() => {
    if (!commentsLoading && commentData) {
      console.log(commentData)
    }
  }, [commentData])
  useEffect(() => {
    getCommentsById({ variables: { id: params?.id } })
  }, [])

  return (
    <div
      style={{
        padding: "50px",
        alignItems: "start",
        display: "flex",
        flexDirection: "column",
        // gap: "50px",
        maxWidth: "800px",
      }}
    >
      <CommunityBox />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid #eee",
          width: "100%",
          padding: "10px 5px",
          height: "15%",
        }}
      >
        <CommentInput
          keyword={"댓글"}
          subId={params.id}
          refetchComments={refetchComments}
          isPost={true}
        />
      </div>
      {commentData?.comments?.map((data, key) => (
        <React.Fragment key={key}>
          <UserFeedBackContainer
            identify={key}
            comment={data}
            fixIsParent
            commentsLoading={commentsLoading}
            // getComments={getComments}
            refetchComments={refetchComments}
            handleToggle={handleToggle}
            setHandleToggle={setHandleToggle}
          />
          {handleToggle?.includes(key) &&
            data?.replies.map((value, subKey) => (
              <UserFeedBackContainer
                key={`child-${subKey}`}
                comment={value}
                fixIsParent={false}
                commentsLoading={commentsLoading}
                // getComments={getComments}
                refetchComments={refetchComments}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  )
}
