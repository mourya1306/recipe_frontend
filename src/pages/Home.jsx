import React, { use, useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import axios from 'axios'
import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])
  const [difficulties, setDifficulties] = useState([])
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

   // Fetch all unique categories and difficulties once on mount
  const fetchFilters = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/all-public`,
        { headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
      setCategories([...new Set(response.data.map(recipe => recipe.category))])
      setDifficulties([...new Set(response.data.map(recipe => recipe.difficulty))])
    } catch (error) {
      console.error('Error fetching filters:', error)
    }
  }

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/all-public?search=${searchTerm}&category=${category}&difficulty=${difficulty}`,
        { headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})

      setRecipes(response.data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
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
    <Box sx={{ alignItems: 'center', mb: 2 }}>
      <Stack direction="row" spacing={2}>
      <TextField
        style={{width:"50%"}}
        label="Search Recipes"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => {
         const value = e.target.value;
        setSearchTerm(value);
        }}
      />
      <Button variant="contained" color="primary" onClick={fetchRecipes}>
        Search
      </Button>

      <Select value={category} 
      onChange={(e) => setCategory(e.target.value)} 
      size="small"
      label='category'

      >
        <MenuItem value=''>None</MenuItem>
        {categories.map((cat) => (  
          <MenuItem  key={cat} value={cat}>{cat}</MenuItem >
        ))}
      </Select>

      <Select value={difficulty} 
      onChange={(e) => setDifficulty(e.target.value)} 
      size="small"
      label='Difficulty'
      >
        <MenuItem value = ''>None</MenuItem>
        {difficulties.map((diff) => (  
          <MenuItem key={diff} value={diff}>{diff}</MenuItem> 
        ))}
      </Select>
      </Stack>
     </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 270px)', gap: 2, justifyContent: 'start' }}>
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