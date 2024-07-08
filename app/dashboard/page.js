'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Nav from '@/app/dashboard/nav/Nav';
import Calendar from '@/components/Calendar';
import { signOut } from 'next-auth/react';
import c from './Dashboard.module.css'

export default function page() {
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    if(view === 'signout'){
      signOut();
    }
  }, [view])

  function displayModal() {
    setShowModal(true);
  }

  return (
    <div className={c.container}>
      <Nav setView={setView} />
      <div className={c.rowRight}>
      {view === 'dashboard' && <Calendar />}
    </div>
    </div>
  )
}
