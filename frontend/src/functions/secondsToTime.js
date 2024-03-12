/**
 *
 * @param number seconds - 초
 * @returns "00:00" 형식의 문자열(분:초)로 변환된 값
 */
export function secondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`
}
