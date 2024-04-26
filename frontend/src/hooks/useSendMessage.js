import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"

export const useSendMeesage = (props) => {
  const { username, email, message } = props
  const validation = () => {
    if (!message) {
      console.log("값비어있다")
      toast.error("작성란이 비어있습니다!")
      return false
    } else if (!username || !email) {
      toast.error("회원 정보가 명확치 않습니다! 다시 로그인 해주세요!")
      return false
    }
    return true
  }

  const sendEmail = () => {
    if (!validation()) return
    const formData = {
      user_name: username,
      user_email: email,
      message: message,
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        (result) => {
          toast.success("전송 완료!")
          console.log(result.text)
        },
        (error) => {
          toast.error(error.text)
          console.log(error.text)
        }
      )
  }

  return { sendEmail }
}
