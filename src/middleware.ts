import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only run middleware on matching routes
export const config = {
  matcher: [
    // Skip all static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  // Get hostname (e.g. vercel.app, example.com)
  const hostname = request.headers.get('host') || '';

  // Prevent security issues – users should not be able to modify these domains
  if (hostname.includes('vercel.app') || hostname.includes('localhost')) {
    return NextResponse.next();
  }

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = request.nextUrl.pathname;

  // Get site from hostname
  const currentHost = hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');

  // Rewrite to custom domain route
  return NextResponse.rewrite(new URL(`/_sites/${currentHost}${path}`, request.url));
} 