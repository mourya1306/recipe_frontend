import { useContext, useState } from 'react'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import {AppContext} from './config/AppContext'
import MyRecipe from './pages/MyRecipe'
import RecipeDetails from './pages/RecipeDetails'
import MyRecipeDetails from './pages/MyRecipeDetails'
import CreateRecipe from './pages/CreateRecipe' 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  const { isAuth } = useContext(AppContext)

  console.log('App render, isAuth:', isAuth)


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/" element={isAuth ? <Layout /> : <Navigate to="/login" replace />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="recipes/:id" element={<RecipeDetails />} />
            <Route path="my-recipes" element={<MyRecipe />} />
            <Route path="create-recipe" element={<CreateRecipe isEdit={false} />} />
            <Route path="my-recipes/:id" element={<CreateRecipe isEdit={true} />} />
            <Route index element={<Navigate to="home" replace />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuth ? "/home" : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
