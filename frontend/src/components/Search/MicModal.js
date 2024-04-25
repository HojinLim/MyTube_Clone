import * as React from "react"
import Box from "@mui/material/Box"
import { Button, IconButton } from "@mui/material"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
// Icon
import MicIcon from "@mui/icons-material/Mic"
import CloseIcon from "@mui/icons-material/Close"
import { useMicPermission } from "hooks/useMicPermission"

const style = {
  position: "absolute",
  top: "25.5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default function MicModal() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [contents, setContents] = React.useState("")
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { hasPermission, getHasMicPermission, getMicPermission } = useMicPermission()
  console.log(hasPermission)

  React.useEffect(() => {
    if (open) {
      getHasMicPermission()
      if (hasPermission !== "granted") {
        getMicPermission()
      }
    }
  }, [open, hasPermission])

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        aria-label="logo"
        sx={{ backgroundColor: "lightgray", color: "black", marginLeft: "10px" }}
      >
        <MicIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {hasPermission == "granted" ? "듣는 중..." : "승인 대기 중"}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "black" }} />
            </IconButton>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {hasPermission !== "granted" &&
              "음성으로 검색하려면 브라우저 설정으로 이동해 마이크에 대한 액세스를 허용하세요."}
          </Typography>

          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "150px",
            }}
          >
            <IconButton sx={{ backgroundColor: "lightgray", marginLeft: "10px" }}>
              <MicIcon sx={{ color: "black" }} fontSize="large" />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
