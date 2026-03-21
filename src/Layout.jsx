import React, { useState, useContext } from 'react'
import { Box, Drawer, useTheme } from '@mui/material'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { AppContext } from './config/AppContext'

const drawerWidth = 200
const closedWidth = 40

const Layout = () => {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const { isLoading } = useContext(AppContext)

  const toggleDrawer = () => setOpen(prev => !prev)

  if (isLoading) {
    return <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</Box>
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar onMenuClick={toggleDrawer} />

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : closedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : closedWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e6e9ee',
            transition: theme.transitions.create('width'),
            position: 'fixed',
            left: 0,
            top: '64px'
          }
        }}
      >
        <Sidebar open={open} />
      </Drawer>

      <Box component="main" sx={{ flex: 1, mt: '64px', ml: '5px', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
