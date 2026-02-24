import React, { useContext, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../config/AppContext'
import { Box, Card, CardContent, Stack, TextField, Typography, Checkbox, FormControlLabel, Button } from '@mui/material'


const LoginForm = () => {

    const { setIsAuth } = useContext(AppContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignInUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login/', {
                email: email,
                password: password
            })
            setIsAuth(true)
            localStorage.setItem('token', response.data.token)
            navigate('/home')
        } catch (error) {
            console.error('Error signing in user:', error)
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

            <Typography variant="h4" sx={{ fontWeight: 800 }}>Sign in</Typography>


            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Email</Typography>
              <TextField fullWidth placeholder="your@email.com" variant="outlined" size="small" 
               onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Password</Typography>
              <TextField fullWidth placeholder="••••••" variant="outlined" size="small" type="password" 
               onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." /> */}

            <Button fullWidth 
            onClick={SignInUser}
            variant="contained" sx={{
              mt: 1,
              background: 'linear-gradient(180deg,#2b2f33,#0b0d10)',
              color: '#fff',
              borderRadius: 2,
              py: 1.2,
              textTransform: 'none',
              boxShadow: 'inset 0 -6px 0 rgba(255,255,255,0.03)'
            }}>Sign In</Button>

            <div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Don't have an account?  
                <Link to="/signup" >
                <Typography component="span" 
                sx={{ color: '#1976d2', fontWeight: 700, cursor: 'pointer', paddingLeft: 0.5 }}
            
                >
                 Sign up
                </Typography>
                </Link>
              </Typography>
            </div>
          </Stack>

        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginForm