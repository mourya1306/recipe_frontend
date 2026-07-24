import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const MyRecipe = () => {

    const [myRecipes, setMyRecipes] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()


    const fetchMyRecipes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API_URL}/recipes/my-recipes`,
                {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})    
            setMyRecipes(response.data)

        } catch (error) {
            console.error('Error fetching my recipes:', error)
            navigate('/login')
        }   
    }

    const handleEdit = (id) => {
       // navigate(`/edit-recipe/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_API_URL}/recipes/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
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