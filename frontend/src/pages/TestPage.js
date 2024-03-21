// 단지 테스트용 페이지입니다.
// 향후 제거될 예정입니다.
// /test
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player/lazy"
import screenfull from "screenfull"
import { dummyData } from "dummy"
export const TestPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) {
        setIsFullscreen(true)
      } else {
        setIsFullscreen(false)
      }
    })

    return () => {
      screenfull.off("change")
    }
  }, [])

  return (
    <>
      <div
        onClick={() => {
          if (screenfull.isEnabled) {
            screenfull.toggle()
          }
        }}
      >
        <ReactPlayer
          url={dummyData[0].sources[0]}
          playing={true}
          width="100%"
          height="100%"
          autoPlay={false}
        />
      </div>
      {/* <button
    
      >
        button
      </button> */}
    </>
  )
}
