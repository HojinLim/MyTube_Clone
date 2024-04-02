import React from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export const CustomIconMenu = ({ iconButton, menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  console.log(anchorEl)
  return (
    <div>
      <IconButton
        style={{ color: "black" }}
        id="custom-menu-button"
        aria-controls={open ? "custom-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {iconButton}
      </IconButton>
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
          <MenuItem key={index} onClick={menuItem.onClick} style={{ gap: "12px" }}>
            {menuItem?.icon} {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
