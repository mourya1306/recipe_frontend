import React from 'react'
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({id, title, description, imageurl, date, path}) => {

    const navigate = useNavigate()
  return (
    <Card sx={{ width: 270, borderRadius: 3, boxShadow: 3 }}
        onClick={() => {
            navigate(path || `/recipes/${id}`)
        }}
    >
       
        <CardContent sx={{ pt: 0.5 }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
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