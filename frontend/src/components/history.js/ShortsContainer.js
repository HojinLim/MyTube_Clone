import React, { useState, useEffect } from "react"

export const ShortsContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentMargin, setCurrentMargin] = useState(0)
  const [slidesPerPage, setSlidesPerPage] = useState(0)
  const [slidesCount, setSlidesCount] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const container = document.getElementById("container")
    const slider = document.getElementById("slider")
    const slides = document.getElementsByClassName("slide").length
    const buttons = document.getElementsByClassName("btn")

    function checkWidth() {
      setContainerWidth(container.offsetWidth)
    }

    function setParams(w) {
      let slidesPerPageValue
      if (w < 551) {
        slidesPerPageValue = 1
      } else if (w < 901) {
        slidesPerPageValue = 2
      } else if (w < 1101) {
        slidesPerPageValue = 3
      } else {
        slidesPerPageValue = 4
      }

      setSlidesPerPage(slidesPerPageValue)
      setSlidesCount(slides - slidesPerPageValue)
      if (currentPosition > slidesCount) {
        setCurrentPosition((prev) => prev - slidesPerPageValue)
      }
      setCurrentMargin(-currentPosition * (100 / slidesPerPageValue))

      if (currentPosition > 0) {
        buttons[0].classList.remove("inactive")
      }
      if (currentPosition < slidesCount) {
        buttons[1].classList.remove("inactive")
      }
      if (currentPosition >= slidesCount) {
        buttons[1].classList.add("inactive")
      }
    }

    setParams(containerWidth)
    window.addEventListener("resize", checkWidth)

    return () => {
      window.removeEventListener("resize", checkWidth)
    }
  }, [currentPosition, slidesCount, containerWidth])

  const slideRight = () => {
    if (currentPosition !== 0) {
      setCurrentMargin((prev) => prev + 100 / slidesPerPage)
      setCurrentPosition((prev) => prev - 1)
    }
  }

  const slideLeft = () => {
    if (currentPosition !== slidesCount) {
      setCurrentMargin((prev) => prev - 100 / slidesPerPage)
      setCurrentPosition((prev) => prev + 1)
    }
  }

  return (
    <div id="container">
      <div id="slider-container">
        <span onClick={slideRight} className="btn"></span>
        <div id="slider" style={{ marginLeft: `${currentMargin}%` }}>
          <div className="slide">
            <span>150x150</span>
          </div>
          <div className="slide">
            <span>150x150</span>
          </div>
          <div className="slide">
            <span>150x150</span>
          </div>
          <div className="slide">
            <span>150x150</span>
          </div>
          <div className="slide">
            <span>150x150</span>
          </div>
        </div>
        <span onClick={slideLeft} className="btn"></span>
      </div>
    </div>
  )
}
