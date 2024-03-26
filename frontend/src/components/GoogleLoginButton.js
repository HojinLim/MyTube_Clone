import React, { useState } from "react"
import UserIcon from "@mui/icons-material/AccountCircleOutlined"
import { IconButton, Typography } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useRecoilState } from "recoil"
import { accountState } from "atom/accountState"
import { changeState } from "atom/accountState"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "apollo/mutation"
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
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  const googleLogin = useGoogleLogin({
    // 로그인 성공
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      window.localStorage.setItem("token", tokenResponse.access_token)
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => {
          console.log(res.data)
          const { name, email, picture } = res.data
          console.log(name)
          console.log(email)
          console.log(picture)
          createUser({
            variables: { username: name, email: email, password: "1234", profileImage: picture },
          }).then((res2) => console.log(res2))

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

      // console.log(user)
    },
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
