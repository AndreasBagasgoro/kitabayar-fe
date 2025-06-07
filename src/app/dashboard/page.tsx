'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function DashboardRedirectPage() {
  const router = useRouter()
  const { isAuthenticated, token, user } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Dashboard auth check:', { isAuthenticated, token, user });
      
      if (!isAuthenticated || !token) {
        console.log('Not authenticated, redirecting to login');
        router.replace('/auth/login');
      } else {
        console.log('Authenticated, redirecting to menu');
        router.replace('/dashboard/menu');
      }
    };

    checkAuth();
  }, [router, isAuthenticated, token, user]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d9291a] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}