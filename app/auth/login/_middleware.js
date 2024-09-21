// app/auth/_middleware.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the path if necessary

export async function middleware(req) {
  const session = await getServerSession({ req, authOptions });

  // If the user is already authenticated, redirect to the dashboard
  if (session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If not authenticated, continue to the login page
  return NextResponse.next();
}
