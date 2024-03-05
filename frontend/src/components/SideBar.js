import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import HomeIcon from "@mui/icons-material/Home"
import SubscriptionIcon from "@mui/icons-material/Subscriptions"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Shorts from "@mui/icons-material/Speed"
import RestoreIcon from "@mui/icons-material/Restore"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import Toolbar from "@mui/material/Toolbar"
import { Typography } from "@mui/material"
import { LoginButton } from "./LoginButton"

const drawerWidth = 240

function SideBar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* 윗 리스트 아이콘 */}
      <List>
        <List>
          {["Home", "Shorts", "구독"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <Shorts />}
                  {index === 2 && <SubscriptionIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </List>
      <Divider />
      {/* 밑 리스트 아이콘 */}
      <List>
        {["나", "시청 기록"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <VideoLibraryIcon />}
                {index === 1 && <RestoreIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box component="section" sx={{ p: 2 }} flexDirection={"column"} display={"flex"}>
        <Typography fontSize={20} variant="h9">
          로그인하면 동영상에 좋아요를 표시하고 댓글을 달거나 구독할 수 있습니다.
        </Typography>
        <LoginButton />
      </Box>
      <Divider />
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box position="fixed">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      ></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  )
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
}

export default SideBar
