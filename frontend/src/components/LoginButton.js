import React from "react"
import UserIcon from "@mui/icons-material/AccountCircleOutlined"
import { IconButton, Typography } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1), // 버튼 내부 여백
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08), // 마우스 호버 시 배경색 변경
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem", // 아이콘 크기
    marginRight: theme.spacing(1), // 아이콘과 텍스트 사이 여백
  },
  "& .MuiTypography-root": {
    fontSize: "1rem", // 텍스트 크기
  },
  borderRadius: 25, // 버튼을 둥글게 만듦
  border: "1px solid black", // 테두리 스타일
}))

export const LoginButton = () => {
  return (
    <StyledIconButton aria-label="login">
      <UserIcon color="blue" />
      <Typography fontSize={12} variant="h6" color="#03b6fc">
        로그인
      </Typography>
    </StyledIconButton>
  )
}
