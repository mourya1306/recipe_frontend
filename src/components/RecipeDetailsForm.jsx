import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const RecipeDetailsForm = () => {

   const handleSubmit = (event) => {

        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        // Handle form submission logic here
        console.log(data)
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <h2>Recipe Details Form</h2>
      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" fullWidth />
        <TextField label="Description" name="description" fullWidth multiline rows={4} />
        <TextField label="Ingredients" name="ingredients" fullWidth multiline rows={4} />
        <TextField label="Instructions" name="instructions" fullWidth multiline rows={4} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Recipe
        </Button>
      </form>
    </Box>
  )
}

export default RecipeDetailsForm