// 단지 테스트용 페이지입니다.
// 향후 제거될 예정입니다.
// /test
import React, { useEffect, useState } from "react"
import ArchiveIcon from "@mui/icons-material/Archive"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { GET_ALL_VIDEOS } from "apollo/query"
import { useQuery } from "@apollo/client"

export const TestPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VIDEOS)

  return (
    <>
      <CustomIconMenu
        iconButton={<ArchiveIcon />}
        menuItems={[
          { text: "test22", onclick: () => {} },
          { text: "test2", onclick: () => {} },
        ]}
      />
    </>
  )
}
