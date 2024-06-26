import React, { useState } from "react"
import UserIcon from "@mui/icons-material/AccountCircleOutlined"
import { IconButton, Typography } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useRecoilState, useSetRecoilState } from "recoil"
import { accountState } from "atom/accountState"
import { changeState } from "atom/accountState"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "apollo/mutation"
import { LOGIN_USER } from "apollo/mutation"
import { REGISTER_USER } from "apollo/mutation"
import { USER_INFO } from "config/constants"
import { STRAPI_TOKEN } from "config/constants"

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
  const setUser = useSetRecoilState(accountState)
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)
  const [loginUser] = useMutation(LOGIN_USER)
  const [registerUser, { registerData, registerLoading, registerError }] =
    useMutation(REGISTER_USER)

  const googleLogin = useGoogleLogin({
    // 로그인 성공
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      window.localStorage.setItem("google-token", tokenResponse.access_token)
      try {
        const userInfo = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then((res) => {
            // 구글 로그인 성공
            console.log(res.data)
            const { name, email, picture, sub, locale } = res.data

            let user = null
            if (!picture) {
              user = { email, picture: null }
            } else {
              user = { email, picture, name }
            }

            loginUser({ variables: { identifier: email, password: sub } })
              .then((response) => {
                console.log(response, "스트라피 data")
                console.log("str_JWT:", response.data.login.jwt)
                console.log(response.data.login.user.id)
                localStorage.setItem(STRAPI_TOKEN, response.data.login.jwt)
                localStorage.setItem(USER_INFO, JSON.stringify(user)) // Fixed this line
                const updatedUser = { ...user, uid: response.data.login.user.id } // Changed variable name to avoid conflict
                setUser(updatedUser)
                localStorage.setItem(USER_INFO, JSON.stringify(updatedUser))
              })

              .catch((error) => {
                // 유저가 없는거임 -> 회원가입
                registerUser({
                  variables: {
                    username: name,
                    email: email,
                    password: sub,
                    locale: locale,
                    profileImage: picture,
                  },
                })
                  .then((data) => {
                    console.log(data)
                    console.log("jwt:", data.data.register.jwt)
                    localStorage.setItem(STRAPI_TOKEN, data.data.register.jwt)
                  })
                  .catch((error) => console.log(error))

                console.error("로그인 중 에러 발생:", error)
              })

            return res.data
          })
      } catch (error) {
        console.error("사용자 정보 가져오는 중 에러 발생:", error)
      }
    },
    // 에러 발생
    onFailure: (error) => {
      console.error("구글 로그인 중 에러 발생:", error)
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
