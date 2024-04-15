export const convertStringToEmoji = (text) => {
  const emojiRegex = /[\da-f]{5}(-[\da-f]{4})?/g // 이모지 코드를 찾는 정규식
  return text.replace(emojiRegex, (match) => {
    // 이모지 코드를 이모지로 변환
    return String.fromCodePoint(parseInt(match, 16))
  })
}

// 예시 문자열
const textWithEmoji = "1f61a270d-fe0fㅇㄻㄻㄻ"

// 이모지 코드를 이모지로 변환하여 새로운 문자열 생성
const newText = convertStringToEmoji(textWithEmoji)

console.log(newText) // 출력: 😚✍️ㅇㄻㄻㄻ
