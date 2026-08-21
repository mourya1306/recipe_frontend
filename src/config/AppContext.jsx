import React, { createContext, useState, useEffect } from 'react'
import api from './api'

 export const AppContext = createContext()

const readStoredJson = (key, fallback) => {
  const saved = localStorage.getItem(key)

  if (!saved) {
    return fallback
  }

  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

export const AppProvider = ({ children }) => {
  // Initialize from localStorage, fallback to false
  const [isAuth, setIsAuth] = useState(() => readStoredJson('isAuth', false))

  const [user, setUser] = useState(() => readStoredJson('user', {}))

  const [themeMode, setThemeMode] = useState(() => readStoredJson('themeMode', 'light'))

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      
      // Only fetch if token exists
      if (!token) {
        setUser({})
        setIsAuth(false)
        setIsLoading(false)
        return
      }

      try {
        const result = await api.get('/user')

        if (result.data) {
          localStorage.setItem('user', JSON.stringify(result.data.user))
          setUser(result.data.user)
          setIsAuth(true)
          console.log('User fetched:', result.data.user)
        } else {
          setUser({})
          setIsAuth(false)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser({})
        setIsAuth(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [isAuth]) // run when auth state changes, including initial mount


  // Persist isAuth to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth))
  }, [isAuth])

  // Persist themeMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', JSON.stringify(themeMode))
  }, [themeMode])

  return (
    <AppContext.Provider 
    value={{ isAuth, setIsAuth, themeMode, setThemeMode , user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  )
}

