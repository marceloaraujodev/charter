import React from 'react';
import Login from '../../components/Login';
import PageContent from '@/app/components/PageContent';

export default async function loginPage() {
//   const session = await getServerSession(authOptions);
// // If the user is already authenticated, redirect to the dashboard
// if (session) {
//   redirect('/dashboard')
// }
  return (
    <PageContent>
      <Login />
    </PageContent>
  );
}     
