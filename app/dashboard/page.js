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
import GallerySettings from './gallery/GallerySettings';
import PageContent from '../components/PageContent';
import c from './Dashboard.module.css';

export default function page() {
  const { data: session } = useSession();
  const [view, setView] = useState('dashboard');
  const [listView, setListView] = useState(session?.user?.role);

  // // console.log(session.user.role)
 
  useEffect(() => {
    if (view === 'signout') {
      signOut();
    }
  }, [view]);

  return (
    <>
    <PageContent>
      {session ? (
        <div className={c.container}>
          <Nav setView={setView} resetView={() => setListView(session?.user?.role)}/>
          <div className={c.rowRight}>
            {view === 'dashboard' && <Calendar />}
            {view === 'services' && <Services />}
            {view === 'checklist' && <CheckList setListView={setListView} listView={listView}/>}
            {view === 'settings' && <Settings />}
            {view === 'gallery' && <GallerySettings />}
          </div>
        </div>
      ) : (
        <Login />
      )}
      
    </PageContent>
    </>
  );
}
