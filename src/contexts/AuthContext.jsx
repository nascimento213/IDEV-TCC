import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
    }
  }, [user])

  const login = (userData, userType) => {
    console.log('AuthContext login - userData:', userData)
    console.log('AuthContext login - userType:', userType)
    const userWithType = { ...userData, type: userType, tipo: userData.tipo }
    console.log('AuthContext login - userWithType:', userWithType)
    setUser(userWithType)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const switchUserType = (newType) => {
    if (user) {
      setUser({ ...user, type: newType })
    }
  }
  
  const updateUser = (newUserData) => {
    setUser({ ...user, ...newUserData })
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout,
      switchUserType,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}