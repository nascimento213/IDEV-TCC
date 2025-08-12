import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (userData, userType) => {
    setUser({ ...userData, type: userType })
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

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout,
      switchUserType
    }}>
      {children}
    </AuthContext.Provider>
  )
}