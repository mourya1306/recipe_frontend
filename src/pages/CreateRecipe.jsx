import { Box, Button, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, Grid, IconButton, FormControl, InputLabel, Paper, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useRef, use, useEffect } from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';

const CreateRecipe = ({isEdit}) => {
    const steps = ['Recipe Details', 'Ingredients', 'Cooking Instructions'];

    const navigate = useNavigate()
    const { id } = useParams() // for edit mode, will have recipe id in URL params


    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [step1Data, setStep1Data] = useState({})
    const [isSuccess, setIsSuccess] = useState(false)
    
    // Step 1 form fields state
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cooking_time, setCookingTime] = useState('')
    const [category, setCategory] = useState('')
    const [servings, setServings] = useState(1)
    const [visibility, setVisibility] = useState('PRIVATE')
    const [image_url, setImageUrl] = useState('')
    const [difficulty, setDifficulty] = useState('Easy')



    const handleNext = () =>{
        if (activeStep < steps.length - 1) {
          // if leaving step 1, save state values to step1Data
          if (activeStep === 0) {
            setStep1Data({
              title,
              description,
              cooking_time: cooking_time ? parseInt(cooking_time, 10) : '',
              category,
              servings: servings ? parseInt(servings, 10) : 1,
              visibility,
              image_url,
              difficulty
            })
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          handleFinish()
        }
    };

  const handleBack = () => {    
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const step1Form = () => {
    return (
      <Box sx={{ maxWidth: 1000, width: '100%', mx: 'auto', mt: 2, px: 2 }}>
        <Paper elevation={1} sx={{ p: 3, width: '100%' }}>
          <form ref={step1FormRef}>
            <Grid container spacing={2}>
              {/* Row 1: Title full width */}
              <Grid item xs={12} md={12}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
              </Grid>

              {/* Row 2: Description full width */}
              <Grid item xs={12} md={12}>
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} />
              </Grid>

              {/* Row 3: Cooking Time (50%) | Category (50%) */}
              <Grid item xs={12} md={6}>
                <TextField label="Cooking Time (mins)" value={cooking_time} onChange={(e) => setCookingTime(e.target.value)} type="number" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth />
              </Grid>

              {/* Row 4: Servings (50%) | Visibility (50%) */}
              <Grid item xs={12} md={6}>
                <TextField label="Servings" value={servings} onChange={(e) => setServings(e.target.value)} type="number" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="visibility-label">Visibility</InputLabel>
                  <Select labelId="visibility-label" label="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                    <MenuItem value="PUBLIC">Public</MenuItem>
                    <MenuItem value="PRIVATE">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 5: Image URL (70%) | Difficulty (30%) */}
              <Grid item xs={12} md={8}>
                <TextField label="Image URL" value={image_url} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select labelId="difficulty-label" label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    )
  }

  const step2Form = () => {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2, px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Step 2: Ingredients</Typography>
            <IconButton color="primary" onClick={addIngredient} aria-label="add-ingredient">
              <AddCircleIcon />
            </IconButton>
          </Box>

          {ingredients.length === 0 && (
            <Typography variant="body2">Click + to add an ingredient</Typography>
          )}

          <Grid container spacing={2}>
            {ingredients.map((ing, idx) => (
              <Grid item xs={12} key={idx}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <TextField label="Name" value={ing.name} onChange={(e) => updateIngredient(idx, 'name', e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={9} md={4}>
                    <TextField label="Quantity" value={ing.quantity} onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton color="error" onClick={() => removeIngredient(idx)} aria-label={`remove-${idx}`}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
    )
  }

  const step3Form = () => {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2, px: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Step 3: Cooking Instructions</Typography>
              <IconButton color="primary" onClick={addInstruction} aria-label="add-instruction">
                <AddCircleIcon />
              </IconButton>
            </Box>

            {instructions.length === 0 && <Typography variant="body2">Click + to add an instruction step</Typography>}

            <Grid container spacing={2}>
              {instructions.map((ins, idx) => (
                <Grid item xs={12} key={idx}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={2}>
                      <TextField label="Step #" type="number" value={ins.step_number} onChange={(e) => updateInstruction(idx, 'step_number', e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <TextField label="Instruction" value={ins.instruction} onChange={(e) => updateInstruction(idx, 'instruction', e.target.value)} fullWidth multiline />
                    </Grid>
                    <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton color="error" onClick={() => removeInstruction(idx)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
        </Box>
    )
  }
  
  // Refs and state for step2/3
  const step1FormRef = useRef(null)
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  const addIngredient = () => setIngredients((prev) => [...prev, { name: '', quantity: '' }])
  const updateIngredient = (index, field, value) => setIngredients((prev) => prev.map((it, i) => i === index ? { ...it, [field]: value } : it))
  const removeIngredient = (index) => setIngredients((prev) => prev.filter((_, i) => i !== index))

  const addInstruction = () => setInstructions((prev) => [...prev, { step_number: prev.length + 1, instruction: '' }])
  const updateInstruction = (index, field, value) => setInstructions((prev) => prev.map((it, i) => i === index ? { ...it, [field]: value } : it))
  const removeInstruction = (index) => setInstructions((prev) => prev.filter((_, i) => i !== index))

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const recipe = response.data
      setStep1Data(recipe.recipe)
      setIngredients(recipe.ingredients)
      setInstructions(recipe.steps)
      setTitle(recipe.recipe.title)
      setDescription(recipe.recipe.description)
      setCookingTime(recipe.recipe.cooking_time)
      setCategory(recipe.recipe.category)
      setServings(recipe.recipe.servings)
      setVisibility(recipe.recipe.visibility)
      setImageUrl(recipe.recipe.image_url)
      setDifficulty(recipe.recipe.difficulty)
    } catch (error) {
      console.error('Error fetching recipe details:', error)
    }
  }


  useEffect(() => {
    if (isEdit && id) {
      fetchRecipeDetails()
    }   
    }, [isEdit, id])

  const handleFinish = async () => {
    // Use saved step1Data (has all Step 1 values)
    const payload = {
      recipe_details: step1Data,
      ingredients,
      instructions
    }

    console.log('Final payload', payload)
    if (isEdit) {
        const updateRecipe = await axios.put(`http://localhost:3000/recipes/${id}/update`, payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }        
        })
        console.log('Recipe updated successfully', updateRecipe.data)
        setIsSuccess(true)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return
    }

    try {
    // TODO: send payload to API
    const result = await axios.post('http://localhost:3000/recipes/create', payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log('Recipe created successfully', result.data)
    setIsSuccess(true)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    } catch (error) {
        console.error('Error creating recipe', error)
        setIsSuccess(false)
    }
  }
      

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', textAlign: 'left', px: 4, pt: 2 }}>
        {activeStep === steps.length ? (
            <>

          <Typography variant="h6">All steps completed - you're finished</Typography>
            <Button onClick={() => navigate('/my-recipes')} sx={{ mt: 2 }}>
              Go to My Recipes
            </Button>

            {isSuccess && isEdit? 
            (
                <Alert severity="success" sx={{ mt: 2 }}>Recipe updated successfully!</Alert>
            ) :
            isSuccess && !isEdit ? (
                <Alert severity="success" sx={{ mt: 2 }}>Recipe created successfully!</Alert>
            ) :
             (
                <Alert severity="error" sx={{ mt: 2 }}>There was an error creating the recipe. Please try again.</Alert>
            )}
          </>
        ) : 
        activeStep === 0 ? (
          step1Form()
        ) :
        activeStep === 1 ? (
          step2Form()
        ) :
        activeStep === 2 ? (
            step3Form()
        ) : null}
      </Box>

      <Box sx={{ position: 'fixed', right: 24, bottom: 24, display: 'flex', gap: 1 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </>

  )
}

export default CreateRecipe