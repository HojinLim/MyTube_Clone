import React, { useEffect } from "react"
import ArchiveIcon from "@mui/icons-material/Archive"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useLazyQuery } from "@apollo/client"
import { GET_COMMENTS_BY_ID } from "apollo/query"
import { useNavigate } from "react-router-dom"
export const TestPage = () => {
  const [getCommentsById, { loading, error, data }] = useLazyQuery(GET_COMMENTS_BY_ID)
  const navigate = useNavigate()
  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data)
    }
  }, [loading, error, data])

  useEffect(() => {
    getCommentsById({ variables: { subId: "64" } })
  }, [])
  const name = "hojin"
  return (
    <>
      <CustomIconMenu
        iconButton={<ArchiveIcon />}
        menuItems={[
          { icon: <ArchiveIcon />, text: "test22", onclick: () => {} },
          { text: "test2", onclick: () => {} },
        ]}
      />
      <div onClick={() => navigate(`/@${name}`)}>test</div>
    </>
  )
}
