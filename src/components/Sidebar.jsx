import React from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import { NavLink } from 'react-router-dom'

const Sidebar = ({ open = true }) => {
  const linkStyle = { textDecoration: 'none', color: 'inherit' }
  return (
    <Box sx={{ width: '100%', pt: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      {/* <Box sx={{ px: open ? 2 : 1, mb: 1 }}>
        {open ? (
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Main items</Typography>
        ) : (
          <Typography variant="caption" color="text.secondary">Menu</Typography>
        )}
      </Box> */}
      <List component="nav" sx={{ pt: 0, mt: 0 }}>
        <NavLink to="/home" style={linkStyle}>
          <ListItemButton sx={{ px: open ? 2 : 1 }}>
            <Tooltip title={!open ? 'Home' : ''} placement="right">
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}><HomeIcon /></ListItemIcon>
            </Tooltip>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
        </NavLink>


        <NavLink to="/my-recipes" style={linkStyle}>
          <ListItemButton sx={{ px: open ? 2 : 1 }}>
            <Tooltip title={!open ? 'My Recipes' : ''} placement="right">
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}><FoodBankRoundedIcon /></ListItemIcon>
            </Tooltip>
            {open && <ListItemText primary="My Recipes" />}
          </ListItemButton>
        </NavLink>


        {/* <NavLink to="/about" style={linkStyle}>
          <ListItemButton sx={{ px: open ? 2 : 1 }}>
            <Tooltip title={!open ? 'About' : ''} placement="right">
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}><InfoIcon /></ListItemIcon>
            </Tooltip>
            {open && <ListItemText primary="About" />}
          </ListItemButton>
        </NavLink> */}
      </List>
      {/* <Divider sx={{ my: 2 }} />
    <Box sx={{ px: open ? 2 : 1 }}>
        {open ? (
          <Typography variant="subtitle2" color="text.secondary">Example items</Typography>
        ) : null}
      </Box>
      <List>
        <ListItemButton sx={{ px: open ? 2 : 1 }}>
          <Tooltip title={!open ? 'Reports' : ''} placement="right">
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}><InsertChartIcon /></ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Reports" />}
        </ListItemButton>
      </List> */}
    </Box>
  )
}

export default Sidebar
