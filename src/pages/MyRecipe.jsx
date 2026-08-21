import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'
import RecipeCard from '../components/RecipeCard'
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const MyRecipe = () => {

    const [myRecipes, setMyRecipes] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [error, setError] = useState(null)
    const [noRecipes, setNoRecipes] = useState(false)
    const navigate = useNavigate()


    const fetchMyRecipes = async () => {
        try {
            const response = await api.get('/recipes/my-recipes')
            const recipes = Array.isArray(response.data) ? response.data : []
            setMyRecipes(recipes)
            setNoRecipes(recipes.length === 0)
            setError(null)

        } catch (error) {
            console.error('Error fetching my recipes:', error)
            if (error.response?.status === 401) {
              navigate('/login')
              return
            }
            if (error.response?.status === 404) {
              setMyRecipes([])
              setNoRecipes(true)
              return
            }
            setNoRecipes(false)
            setError('Unable to load your recipes. Please try again.')
        }   
    }

    const handleEdit = (id) => {
       // navigate(`/edit-recipe/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/recipes/${id}`);
            // remove locally without refetch
            setMyRecipes(prev => prev.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }

    useEffect(() => {   
        fetchMyRecipes()
    }, [])

  return (
    <>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <h2>My Recipes</h2>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create New Recipe
      </Button>
    </Box>

    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    {noRecipes && !error && (
      <Alert severity="info" sx={{ mb: 2 }}>
        Your recipe collection is empty. Start by creating your first recipe!
      </Alert>
    )}

    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
     <DialogTitle id="alert-dialog-title">{"Create New Recipe"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">  
            Click on below button to create a new recipe. You will be able to add ingredients, instructions, and upload an image for your recipe.
            </DialogContentText>
            <Button variant="contained" color="primary" onClick={() => navigate('/create-recipe')} sx={{ mt: 2 }}>
                Create Recipe
            </Button>
            <DialogContentText id="alert-dialog-description" sx={{ mt: 2 }}>
                Click below button to create AI generated recipe. You will be able to input a recipe ingredient, and the system will generate a recipe for you based on that information.
            </DialogContentText>
            <Button variant="contained" color="secondary" onClick={() => navigate('/ai-recipe')} sx={{ mt: 2 }}>
                Create AI Generated Recipe
            </Button>
         </DialogContent> 
    </Dialog>

    
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 270px)', gap: 2, justifyContent: 'start' }}>
      {myRecipes.map((recipe) => (
        <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            imageurl={recipe.image_url}
            date={recipe.updated_at}    
            path={`/my-recipes/${recipe.id}`}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      ))}
    </Box>
    </>
  )
}

export default MyRecipe