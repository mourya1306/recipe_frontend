import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import api from '../config/api'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const RecipeDetails = () => {

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])


    const fetchRecipeDetails = async () => {
        try {
                 const response = await api.get(`/recipes/${id}`)

                setRecipe(response.data.recipe)
                setIngredients(response.data.ingredients)
                setSteps(response.data.steps)

             } catch (error) {
            console.error('Error fetching recipe details:', error)
        }   }

    useEffect(() => {
        fetchRecipeDetails()
    }, [])



  return (
    <Box  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ pt: 2, alignItems: 'center', gap: 2 }}>
        <Typography style={{marginBottom: 10}} variant="h4" sx={{ fontWeight: 700}}>{recipe?.title}</Typography>
                <img
                    src={recipe?.image_url}
                    alt={recipe?.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder-image.png' }}
                    style={{ width: '100%', maxWidth: 600, maxHeight: 420, height: 'auto', objectFit: 'contain', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8 }}
                />
        <Typography variant="body1" color="text.secondary">{recipe?.description}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Ingredients</Typography>
            {ingredients.map((ingredient, index) => (
                <Typography key={index} variant="body2" color="text.secondary">{ingredient.name} - {ingredient.quantity}</Typography>
            ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Steps</Typography>
            {steps.map((step, index) => (
                <Typography key={index} variant="body2" color="text.secondary">{index + 1}. {step.instruction}</Typography>
            ))}
        </Box>
            </CardContent>
    </Card>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="caption" color="text.secondary">Last updated: {moment(recipe?.updated_at).format('MMM DD, YYYY')}</Typography>
        <Typography variant="caption" color="text.secondary">Created at: {moment(recipe?.created_at).format('MMM DD, YYYY')}</Typography>
        <Typography variant="caption" color="text.secondary">Created By: {recipe?.name}</Typography>
        </Box>
        
    </Box>
  )
}

export default RecipeDetails