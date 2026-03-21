import { CheckBox } from '@mui/icons-material'
import { Alert, Box, Button, Card, CardContent, Checkbox, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'


function TabPanel(props) {
  const { children, value, index, recipe, ...other } = props;

  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {recipe && (
            <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {recipe.recipe_details.title}
                </Typography>
                <img
                  src={recipe.recipe_details.image_url}
                  alt={recipe.recipe_details.title}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder-image.png' }}
                  style={{ width: '100%', maxWidth: 600, maxHeight: 420, height: 'auto', objectFit: 'contain', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8 }}
                />
                <Typography variant="body1" color="text.secondary">
                  {recipe.recipe_details.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Ingredients</Typography>
                  {recipe.ingredients.map((ingredient, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {ingredient.name} - {ingredient.quantity}
                    </Typography>
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Instructions</Typography>
                  {recipe.instructions.map((step, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {step.step_number}. {step.instruction}
                    </Typography>
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Cooking Time: {recipe.recipe_details.cooking_time} mins
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Difficulty: {recipe.recipe_details.difficulty}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Servings: {recipe.recipe_details.servings}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Category: {recipe.recipe_details.category}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
      
        </Box>
      )}
      
    </div>
  );
}

const CreateAiRecipe = () => {
    const [strIngredient , setStrIngredient] = useState('')
    const [checked, setChecked] = useState(false);
    const [activeTab , setActiveTab] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [aiRecipes , setAiRecipes] = useState([])
    const [recipeAdded, setRecipeAdded] = useState([])

    const handleSubmit = async () =>{
        console.log(strIngredient , checked)
        const ingredientsArray = strIngredient.split(',').map(ing => ing.trim()).filter(ing => ing !== '')
        try {
        setIsLoading(true)
        const result = await axios.post('http://localhost:3000/recipes/ai-create', { ingredients: ingredientsArray, useOnlyThis: checked },
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
        setAiRecipes(result.data.recipes)
        setIsLoading(false)
        } catch (error) {
          console.error('Error creating AI recipe:', error) 
          setIsLoading(false)
        }
    }
    const handleChange = (event) => {
    setChecked(event.target.checked);
  };


const handleTabChnage = (event, newValue) => {
    console.log(newValue)
    setActiveTab(newValue)
}

const addToMyrecipe = async () => {

    try {
      await axios.post('http://localhost:3000/recipes/create', {
        ...aiRecipes[activeTab]
      },
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setRecipeAdded([...recipeAdded, activeTab])
    alert('Recipe added to My Recipes!')

    return(
      <Alert severity="success" sx={{ mt: 2 }}>
      Recipe added to My Recipes!
    </Alert>
    )
      
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe.');
    }
  };


  return (
    <>
    <Box >
        <Stack spacing={2}>
        <Typography variant="title" color="text.secondary" sx={{ mb: 10 }}>Enter ingredients you have by comma separated</Typography>
        <TextField 
        style={{marginBottom:'10px' , marginTop:'10px'}}
        value={strIngredient}
        onChange={(e) => setStrIngredient(e.target.value)}
        label="Ingredients" variant="outlined"
        fullWidth multiline rows={3}
        />
        </Stack>
        <Stack direction="row" spacing={0} alignItems="center">
          <Checkbox
            checked={checked}
            onChange={handleChange}
            slotProps={{
              input: { 'aria-label': 'controlled' },
            }}
          />
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1 }}>
            use only this ingredients
          </Typography>

          <Button style={{marginLeft:"60px"}} onClick={handleSubmit} variant="contained">
            Create AI Recipe
          </Button>
        </Stack>    
</Box>

<Box sx={{ width: '100%' }}>
  {isLoading ? (
    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
      Generating recipes, please wait...
      </Typography>) : (
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activeTab} onChange={handleTabChnage} aria-label="basic tabs example">
    {aiRecipes.map((recipe , index) =>{
        return <Tab label ={recipe.recipe_details.title} key={index} />
    })}
    </Tabs>
    {
        aiRecipes.map((recipe , index) =>{
          return (
            <TabPanel value={activeTab} index={index} key={index} recipe={recipe} />
          )
        })
      
    }

</Box>)}
{
  aiRecipes.length > 0 ? (
    recipeAdded.includes(activeTab) ? (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Recipe already added to My Recipes!
      </Typography>
    ) : (
      <Button
        variant='contained'
        sx={{ mt: 2 }}
        onClick={addToMyrecipe}
      >
        Save as My Recipe
      </Button>
    )
  ) : null}
      
</Box>

    </>  
)
}

export default CreateAiRecipe