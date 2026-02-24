import React, { createContext, useState, useEffect } from 'react'

 export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // Initialize from localStorage, fallback to false
  const [isAuth, setIsAuth] = useState(() => {
    const saved = localStorage.getItem('isAuth')
    return saved ? JSON.parse(saved) : false
  })
  
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('themeMode')
    return saved ? JSON.parse(saved) : 'light'
  })

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
    value={{ isAuth, setIsAuth, themeMode, setThemeMode }}
    >
      {children}
    </AppContext.Provider>
  )
}

