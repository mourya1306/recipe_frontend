import React, { useState } from 'react'
import { Box, Card, CardContent, IconButton, Typography, Menu, MenuItem } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const RecipeCard = ({id, title, description, imageurl, date, path, onEdit, onDelete}) => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleMenuClick = (event) => {
      event.stopPropagation()
      setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    const handleEdit = () => {
      handleMenuClose()
      navigate(path)
      onEdit && onEdit(id)
    }

    const handleDelete = async () => {
      handleMenuClose()
      try {
       const result = await axios.delete(`${process.env.REACT_API_URL}/recipes/${id}`,
        {
          headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }   
        })
        alert('Recipe deleted successfully!')
        
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe.');
        
      }
      onDelete && onDelete(id)
    }

  return (
    <Card sx={{ width: 280, borderRadius: 3, boxShadow: 3 }}>
       
        <CardContent sx={{ pt: 0.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600,textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden", cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => {
                    navigate(`/recipes/${id}`)
                }}
                >{title}
                </Typography>
                {path && (
                <>
                <IconButton aria-label="settings" size="small" onClick={handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  getContentAnchorEl={null}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                </>
                )}
                </Box>


                <Typography variant="caption" color="text.secondary">{moment(date).format('MMM DD, YYYY')}</Typography>
                                <img
                                    src={imageurl}
                                    alt={title}
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder-image.png' }}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, display: 'block' }}
                                />
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </Box>
        </CardContent>
     </Card>
  )
}

export default RecipeCard