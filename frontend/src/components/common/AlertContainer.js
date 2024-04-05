import React from "react"
import Alert from "@mui/material/Alert"

// Icons
import CheckIcon from "@mui/icons-material/Check"
export const AlertContainer = ({ type, message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "9999", // Ensure it's above other elements
      }}
    >
      <Alert icon={<CheckIcon fontSize="inherit" />} severity={type} onClose={() => {}}>
        {message}
      </Alert>
    </div>
  )
}
