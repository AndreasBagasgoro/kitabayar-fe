'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, token, user } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Protected route auth check:', { isAuthenticated, token, user });
      
      if (!isAuthenticated || !token) {
        console.log('Not authenticated, redirecting to login');
        router.replace('/auth/login');
      }
    };

    checkAuth();
  }, [router, isAuthenticated, token, user]);

  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d9291a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 