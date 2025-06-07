'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { validateToken } from '../../../services/api/auth'
import Cookies from 'js-cookie'

interface User {
  id: string;
  email: string;
  name: string;
  gender: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if (storedToken && storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            console.log('Initializing auth with stored data:', { token: storedToken, user: userData })
            
            // Validate token with backend
            await validateToken(storedToken)
            
            // Set token in both localStorage and cookies
            localStorage.setItem('token', storedToken)
            Cookies.set('token', storedToken, { expires: 7 }) // Expires in 7 days
            
            setToken(storedToken)
            setUser(userData)
            setIsAuthenticated(true)

            // Set token in Authorization header
            if (typeof window !== 'undefined') {
              const api = (window as any).api
              if (api) {
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
              }
            }
          } catch (error) {
            console.error('Auth initialization failed:', error)
            logout()
          }
        }
      } catch (error) {
        console.error('Error during auth initialization:', error)
        logout()
      }
    }

    initializeAuth()
  }, [])

  const login = (newToken: string, userData: User) => {
    try {
      console.log('Logging in with:', { token: newToken, user: userData })
      
      // Store token in both localStorage and cookies
      localStorage.setItem('token', newToken)
      Cookies.set('token', newToken, { expires: 7 }) // Expires in 7 days
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Update state
      setToken(newToken)
      setUser(userData)
      setIsAuthenticated(true)

      // Set token in Authorization header
      if (typeof window !== 'undefined') {
        const api = (window as any).api
        if (api) {
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        }
      }
    } catch (error) {
      console.error('Error during login:', error)
      logout()
    }
  }

  const logout = () => {
    try {
      console.log('Logging out')
      
      // Clear localStorage and cookies
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      Cookies.remove('token')
      
      // Clear state
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)

      // Remove token from Authorization header
      if (typeof window !== 'undefined') {
        const api = (window as any).api
        if (api) {
          delete api.defaults.headers.common['Authorization']
        }
      }

      // Redirect to login
      router.push('/auth/login')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 