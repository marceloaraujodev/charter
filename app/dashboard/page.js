'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Nav from '@/app/dashboard/nav/Nav';
import Calendar from '@/app/components/Calendar';
import Services from './services/Services';
import { signOut } from 'next-auth/react';
import CheckList from './checklist/CheckList';
import c from './Dashboard.module.css';

export default function page() {
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    if (view === 'signout') {
      signOut();
    }
  }, [view]);

  // function displayModal() {
  //   setShowModal(true);
  // }

  return (
    <div className={c.container}>
      <Nav setView={setView} />
      <div className={c.rowRight}>
        {view === 'dashboard' && <Calendar />}
        {view === 'services' && <Services />}
        {view === 'checklist' && <CheckList />}
      </div>
    </div>
  );
}
