import axios from "axios"

// .jpg 형식을 받아서 평균 RGB 값을 계산하는 함수
export async function getAverageRGBFromJpgUrl(imageUrl) {
  try {
    // 이미지 데이터 가져오기
    const response = await axios.get(imageUrl, { responseType: "blob" })
    const blob = response.data

    // 이미지 데이터를 Blob으로 변환
    const imgEl = new Image()
    imgEl.src = URL.createObjectURL(blob)

    // 이미지 엘리먼트의 로드가 완료되면 실행되는 함수
    await new Promise((resolve, reject) => {
      imgEl.onload = resolve
      imgEl.onerror = reject
    })

    // 이미지 엘리먼트가 로드되었을 때 평균 RGB 값을 계산하고 반환
    return getAverageRGB(imgEl)
  } catch (error) {
    console.error("Error fetching image:", error)
    throw error
  }
}

// 주어진 이미지 엘리먼트의 평균 RGB 값을 계산하는 함수
const getAverageRGB = (imgEl) => {
  // 이미지가 로드되면 캔버스에 이미지를 그립니다.
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const width = (canvas.width = imgEl.width)
  const height = (canvas.height = imgEl.height)

  context.drawImage(imgEl, 0, 0, width, height)

  // 캔버스에서 이미지 데이터 가져오기
  const imageData = context.getImageData(0, 0, width, height)
  const data = imageData.data

  // 평균 RGB 값을 계산
  let r = 0,
    g = 0,
    b = 0
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  const pixelCount = data.length / 4
  r = Math.round(r / pixelCount)
  g = Math.round(g / pixelCount)
  b = Math.round(b / pixelCount)

  // 평균 RGB 값을 객체로 반환
  return { r, g, b }
}
