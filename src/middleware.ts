import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/sessions";

// Define route patterns
const protectedRoutes = ["/dashboard", "/dashboard/:path*"];
const publicRoutes = ["/login", "/register"];
const authRoutes = ["/api/auth/:path*"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if the current path matches any protected or public patterns
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || (route.includes(":path*") && path.startsWith(route.split(":path*")[0]))
  );
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.some(route => 
    path.startsWith(route.split(":path*")[0])
  );

  // Get and verify session
  const sessionCookie = req.cookies.get("session");
  const session = sessionCookie ? await decrypt(sessionCookie.value) : null;
  const isAuthenticated = !!session?.userId;

  // Security headers
  const headers = new Headers({
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  });

  // Handle API routes
  if (isAuthRoute) {
    if (!isAuthenticated) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(headers)
          }
        }
      );
    }
    return NextResponse.next({
      headers: headers,
    });
  }

  // Handle protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle public routes (login, register) when user is already authenticated
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Continue with added security headers
  return NextResponse.next({
    headers: headers,
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};