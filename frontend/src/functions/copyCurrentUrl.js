export function copyCurrentUrl() {
  const currentUrl = window.location.href
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert("현재 링크가 복사되었습니다.")
    })
    .catch((error) => {
      console.error("링크 복사 중 오류 발생:", error)
    })
}
