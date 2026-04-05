import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow login page and auth API
  if (path === '/admin' || path.startsWith('/admin/login') || path.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }
  
  // Check for admin routes
  if (path.startsWith('/admin') || (path.startsWith('/api/admin') && !path.startsWith('/api/admin/auth'))) {
    const session = request.cookies.get('sumsur_admin_session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
