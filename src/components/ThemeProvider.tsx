import React, { useState, useEffect } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Theme } from '../types/theme'

const THEME_STORAGE = 'theme-storage'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem(THEME_STORAGE)
    return storagedTheme ? JSON.parse(storagedTheme) : 'light'
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE, JSON.stringify(newTheme))
      return newTheme
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
