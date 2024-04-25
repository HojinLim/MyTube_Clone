import React from "react"
import { Typography, Container, Box } from "@mui/material"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { useParams } from "react-router-dom"

const NoResultsPage = () => {
  const params = useParams()
  const keyword = params?.keyword
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "30vh",
        }}
      >
        <SentimentVeryDissatisfiedIcon color="blue" sx={{ width: "80px", height: "80px" }} />
        <Typography variant="h5" gutterBottom>
          {keyword == undefined ? "값을 다시 입력해주세요" : "찾을 수 없음"}
        </Typography>
        {keyword !== undefined && (
          <Typography variant="body1">{`" ${keyword} " 란 검색결과를 찾을 수 없습니다!`}</Typography>
        )}
      </Box>
    </Container>
  )
}

export default NoResultsPage
