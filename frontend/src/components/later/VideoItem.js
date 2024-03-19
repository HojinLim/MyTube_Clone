import React from "react"
import person from "assets/images/person.png"

export const VideoItem = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "coral",
        padding: "5px",

        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div>1</div>
      <img
        src={person}
        style={{
          backgroundColor: "wheat",
          // width: "60vw",
          maxWidth: "200px",
          maxHeight: "180px",
          height: "100%",
          width: "100%",
          borderRadius: "20px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div>제목</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>주인장 </div>
          <div>•</div>
          <div>조회수 10회</div>
          <div>•</div>
          <div>1개월 전</div>
        </div>
      </div>
    </div>
  )
}
