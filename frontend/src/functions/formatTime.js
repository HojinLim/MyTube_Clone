export function formatTime(seconds) {
  const filterdSeconds = Math.trunc(seconds)
  const minutes = Math.floor(filterdSeconds / 60)
  const remainingSeconds = filterdSeconds % 60

  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(remainingSeconds).padStart(2, "0")

  return `${formattedMinutes}:${formattedSeconds}`
}
// 예시
// console.log(formatTime(65)) // 출력: "01:05"
