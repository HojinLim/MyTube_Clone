import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function CustomMenu({ buttonText, menuItems }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="custom-menu-button"
        aria-controls={open ? "custom-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "custom-menu-button",
        }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} onClick={menuItem.onClick}>
            {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
