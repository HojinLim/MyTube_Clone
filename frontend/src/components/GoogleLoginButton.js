import React from "react"
import UserIcon from "@mui/icons-material/AccountCircleOutlined"
import { IconButton, Typography } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import useGoogleAuth from "hooks/useGoogleAuth"

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
  },
  "& .MuiTypography-root": {
    fontSize: "1rem",
  },
  borderRadius: 25,
  border: "1px solid black",
}))

export const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data)

      console.log(userInfo)
    },
    // flow: 'implicit', // implicit is the default
  })
  return (
    <StyledIconButton aria-label="login" onClick={() => googleLogin()}>
      <UserIcon color="blue" />
      <Typography fontSize={12} variant="h6" color="#03b6fc">
        로그인
      </Typography>
    </StyledIconButton>
  )
}
