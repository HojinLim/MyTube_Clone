import React from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import { Button, InputBase } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"

export const CustomButtonWithBox = (props) => {
  const { buttonStyle, icon, menuItems, text } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const menuItemClickHandler = (onClick) => {
    onClick()
    setAnchorEl(false)
  }

  return (
    <>
      <Button
        style={buttonStyle}
        id="custom-menu-button"
        aria-controls={open ? "custom-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {icon}
        <div>{text}</div>
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
        {menuItems?.map((menuItem, index) => (
          <MenuItem
            key={index}
            onClick={() => menuItemClickHandler(menuItem.onClick)}
            style={{ gap: "12px" }}
          >
            {menuItem?.icon} {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
