import { googleLogout, useGoogleLogin } from "@react-oauth/google"

const useGoogleAuth = async () => {
  const logout = googleLogout()

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
    onError: (error) => {
      console.error(error)
    },
    // flow: 'implicit', // implicit is the default
  })

  return { logout, googleLogin }
}

export default useGoogleAuth
