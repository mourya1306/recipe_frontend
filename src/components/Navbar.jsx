import React from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700, color: '#1976d2' }}>Recipe App</Typography>
        <div style={{ flex: 1 }} />
        <Avatar sx={{ bgcolor: '#e0e0e0', color: '#333' }}>SM</Avatar>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
