import toast from "react-hot-toast"

export function copyCurrentUrl() {
  const currentUrl = window.location.href
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      toast.success("현재 링크가 복사되었습니다.")
    })
    .catch((error) => {
      toast.success("링크 복사 중 오류 발생!")
      console.error("링크 복사 중 오류 발생:", error)
    })
}
