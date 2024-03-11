import React from "react"
import UserIcon from "@mui/icons-material/AccountCircleOutlined"
import { IconButton, Typography } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useRecoilState } from "recoil"
import { accountState } from "atom/accountState"
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
  const [user, setUser] = useRecoilState(accountState)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      window.localStorage.setItem("token", tokenResponse.access_token)
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => {
          console.log(res.data)
          return res.data
        })

      const { email, pitcure } = userInfo
      let user = null
      if (!pitcure) {
        user = { email, pitcure: null }
      } else {
        user = { email, pitcure }
      }

      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      // window.location.reload()

      console.log(user)
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
