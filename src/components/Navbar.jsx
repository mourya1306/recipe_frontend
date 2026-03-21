import React, { useContext, useState } from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Typography, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppContext } from '../config/AppContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onMenuClick }) => {
  const {user, setUser,setIsAuth} = useContext(AppContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleMenuClick = (event) => {
      event.stopPropagation()
      setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    const updateProfile = () => {
      handleMenuClose()
      navigate("/my-profile")
    }

    const handleLogout = async () => {
      handleMenuClose()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser({})
      setIsAuth(false)
      navigate('/login')
    }

  
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'
  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700, color: '#1976d2' }}>Recipe App</Typography>
        <div style={{ flex: 1 }} />
        <Avatar 
        sx={{ bgcolor: '#e0e0e0', color: '#333' }}
        onClick={handleMenuClick}
        >
          {initials}
        </Avatar>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={updateProfile}>Update Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
