import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function SimpleDialog(props) {
  const { initState, title, cancelText, confirmText, execute, cancel } = props
  const [open, setOpen] = React.useState(initState)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    cancel()
    setOpen(false)
  }
  const executeHandler = () => {
    execute()
    handleClose()
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontWeight: "600" }}>
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={executeHandler} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
