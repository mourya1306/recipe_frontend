import axios from 'axios'
import React, { createContext, useState, useEffect, use } from 'react'

 export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // Initialize from localStorage, fallback to false
  const [isAuth, setIsAuth] = useState(() => {
    const saved = localStorage.getItem('isAuth')
    return saved ? JSON.parse(saved) : false
  })

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : {}
  })

  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('themeMode')
    return saved ? JSON.parse(saved) : 'light'
  })

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
        const result = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

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

