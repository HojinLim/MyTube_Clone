import React from "react"
import person from "assets/images/person.png"
import { dummyData } from "dummy"
import ReactPlayer from "react-player"
export const ShortsContainerr = () => {
  return (
    <div className="slider-container">
      <div className="slide">
        <ReactPlayer url={dummyData[0].sources[0]} playing={false} width={"100%"} height={"100%"} />
      </div>
      <div className="slide">
        <ReactPlayer url={dummyData[1].sources[0]} playing width={"100%"} height={"100%"} />
      </div>
      <div className="slide">
        <ReactPlayer url={dummyData[2].sources[0]} playing width={"100%"} height={"100%"} />
      </div>
      <div className="slide">
        <img src={person} alt="shorts" />
      </div>
      <div className="slide">
        <div>ggg</div>
      </div>
    </div>
  )
}
