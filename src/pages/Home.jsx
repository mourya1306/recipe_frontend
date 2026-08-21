import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import api from '../config/api'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])
  const [difficulties, setDifficulties] = useState([])
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [apiError, setApiError] = useState(false)

  const getRecipeList = (data) => Array.isArray(data) ? data : []

   // Fetch all unique categories and difficulties once on mount
  const fetchFilters = async () => {
    try {
      const response = await api.get('/recipes/all-public')
      const recipeList = getRecipeList(response.data)
      setCategories([...new Set(recipeList.map(recipe => recipe.category).filter(Boolean))])
      setDifficulties([...new Set(recipeList.map(recipe => recipe.difficulty).filter(Boolean))])
    } catch (error) {
      console.error('Error fetching filters:', error)
      setCategories([])
      setDifficulties([])
    }
  }

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/recipes/all-public', {
        params: {
          search: searchTerm,
          category,
          difficulty
        }
      })

      setRecipes(getRecipeList(response.data))
      setApiError(false)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setRecipes([])
      setApiError(true)
    } 
  }

  // Fetch filters on mount
  useEffect(() => {
    fetchFilters()
  }, [])

  // Fetch recipes when filters change (category/difficulty)
  useEffect(() => {
        fetchRecipes()
  }, [category, difficulty])
  return (
    <>
    {apiError && (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Recipes are unavailable right now. Please start the backend and try again.
      </Alert>
    )}
    <Box sx={{ alignItems: 'center', mb: 2 }}>
      <Stack direction="row" spacing={2}>
      <TextField
        style={{width:"50%"}}
        label="Search Recipes"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
         const value = e.target.value;
        setSearchTerm(value);
        }}
      />
      <Button variant="contained" color="primary" onClick={fetchRecipes}>
        Search
      </Button>

      {/* <Select value={category} 
      onChange={(e) => setCategory(e.target.value)} 
      size="small"
      label='category'

      >
        
      </Select> */}


      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
        
          labelId="category-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value=''>None</MenuItem>
        {categories.map((cat) => (  
          <MenuItem  key={cat} value={cat}>{cat}</MenuItem >
        ))}
          
        </Select>
      </FormControl>
    </Box>

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          id="difficulty-select"
          value={difficulty}
          label="Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value = ''>None</MenuItem>
        {difficulties.map((diff) => (  
          <MenuItem key={diff} value={diff}>{diff}</MenuItem> 
        ))}
          
        </Select>
      </FormControl>
    </Box>

      {/* <Select 
      value={difficulty} 
      onChange={(e) => setDifficulty(e.target.value)} 
      size="small"
      label='Difficulty'
      >
        
      </Select> */}
      </Stack>
     </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2, justifyContent: 'start' }}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          imageurl={recipe.image_url}
          date={recipe.updated_at}
        />
      ))}
    </Box>
    </>
  )
}

export default Home