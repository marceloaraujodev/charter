'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Nav from '@/app/dashboard/nav/Nav';
import Calendar from '@/app/components/Calendar';
import { signIn, signOut, useSession } from 'next-auth/react';
import Services from './services/Services';
import CheckList from './checklist/CheckList';
import Login from '../components/Login';
import Settings from './settings/Settings';
import c from './Dashboard.module.css';

export default function page() {
  const [view, setView] = useState('dashboard');
  const { data: session } = useSession();

  // // console.log(session.user.role)
  console.log(session);
  // if(session.user.role === 'admin' || session.user.role === 'captain' || session.user.role === 'stew'){

  // }

  useEffect(() => {
    if (view === 'signout') {
      signOut();
    }
  }, [view]);

  return (
    <>
      {session ? (
        <div className={c.container}>
          <Nav setView={setView} />
          <div className={c.rowRight}>
            {view === 'dashboard' && <Calendar />}
            {view === 'services' && <Services />}
            {view === 'checklist' && <CheckList />}
            {view === 'settings' && <Settings />}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
