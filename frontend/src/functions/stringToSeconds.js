/**
 *
 * @param {"00:00"} duration - "00:00" 형식의 문자열(분:초)
 * @returns seconds (초)로 변환된 값
 */
export function stringToSeconds(duration) {
  const splited = duration.split(":")
  const minutes = Number(splited[0])
  const seconds = Number(splited[1])
  return minutes * 60 + seconds
}
// example "10:53" => 653
