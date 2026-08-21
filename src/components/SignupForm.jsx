import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'
import { Box, Card, CardContent, Stack, TextField, Typography, Checkbox, FormControlLabel, Button, Alert } from '@mui/material'

const SignupForm = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const signUpUser = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const response = await api.post('/signup', {
        name: name,
        email: email,
        password: password
      })

      console.log('User signed up successfully:', response)
      setName('')
      setEmail('')
      setPassword('')
      setSuccess('Signup successful. Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
      
    } catch (err) {
      console.error('Error signing up user:', err)
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: '#1976d2', fontWeight: 700 }}>Sitemark</Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800 }}>Sign up</Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Full name</Typography>
              <TextField fullWidth placeholder="Jon Snow" variant="outlined" size="small" 
               value={name}
               onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Email</Typography>
              <TextField fullWidth placeholder="your@email.com" variant="outlined" size="small" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Password</Typography>
              <TextField fullWidth placeholder="••••••" variant="outlined" size="small" type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />

            <Button fullWidth 
            onClick={signUpUser}
            disabled={loading}
            variant="contained" sx={{
              mt: 1,
              background: 'linear-gradient(180deg,#2b2f33,#0b0d10)',
              color: '#fff',
              borderRadius: 2,
              py: 1.2,
              textTransform: 'none',
              boxShadow: 'inset 0 -6px 0 rgba(255,255,255,0.03)'
            }}>{loading ? 'Submitting…' : 'Sign up'}</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignupForm