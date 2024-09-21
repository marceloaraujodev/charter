import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from '../../components/Login';
import PageContent from '@/app/components/PageContent';
import { redirect } from 'next/navigation';
import c from './page.module.css'
export default async function loginPage() {
  const session = await getServerSession(authOptions);
// If the user is already authenticated, redirect to the dashboard
if (session) {
  redirect('/dashboard')
}
  return (
    <PageContent>
      <Login />
    </PageContent>
  );
}     
