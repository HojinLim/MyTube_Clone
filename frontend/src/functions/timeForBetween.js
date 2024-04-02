export function timeForBetween(pastTime) {
  // 비교할 두 날짜를 생성합니다.
  const pastDate = new Date(pastTime)
  const currentDate = new Date()

  // 두 날짜 사이의 차이를 계산합니다. (밀리초 단위)
  const timeDifference = currentDate - pastDate

  // 차이를 시간과 분으로 변환합니다.
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))
  const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60)
  const daysDifference = Math.floor(hoursDifference / 24)

  // 방금전 영상인지 여부를 확인합니다.
  if (daysDifference >= 1) {
    // console.log(`${daysDifference}일 전`)
    return `${daysDifference}일 전`
  } else if (hoursDifference >= 1) {
    // console.log(`${hoursDifference}시간 전`)
    return `${hoursDifference}시간 전`
  } else {
    // console.log("방금전 영상입니다.")
    return "방금전 영상입니다."
  }
}
