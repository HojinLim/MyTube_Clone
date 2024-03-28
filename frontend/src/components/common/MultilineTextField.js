import React, { useState } from "react"
import TextField from "@mui/material/TextField"

function MultilineTextField({ label, initialText, onTextChange }) {
  const [text, setText] = useState(initialText)

  const handleTextChange = (event) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText) // 변경된 텍스트를 부모 컨테이너로 전달
  }

  return (
    <TextField
      id="outlined-multiline-flexible"
      onChange={handleTextChange}
      label={label}
      multiline
      maxRows={4}
      fullWidth={true}
      placeholder="내용"
      value={text}
      style={{ margin: "20px 0px" }}
      sx={{
        "&:hover": {
          border: "1px solid lightblue", // hover 시 배경색 변경
        },
        "&:focus": {
          border: "2px solid lightblue", // focus 시 테두리 색상 변경
          // boxShadow: "0 0 0 3px #80BFFF",
        },
      }}
    />
  )
}

export default MultilineTextField
