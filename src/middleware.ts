import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the request is for the dashboard
  if (pathname.startsWith('/dashboard')) {
    // Get token from cookies
    const token = request.cookies.get('token')?.value

    // If no token is present, redirect to login
    if (!token) {
      console.log('No token found in cookies, redirecting to login')
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // If token is present, allow the request to proceed
    console.log('Token found in cookies, allowing access to dashboard')
    return NextResponse.next()
  }

  // For all other routes, allow the request to proceed
  return NextResponse.next()
}

// Configure which routes to run the middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
  ],
} 