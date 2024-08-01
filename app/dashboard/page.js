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
  const [listTileIsVisible, setListTileIsVisible] = useState(true);
  const [displayList, setDisplayList] = useState(false);

  // // console.log(session.user.role)
 
  useEffect(() => {
    if (view === 'signout') {
      signOut();
    }
  }, [view]);

  const handleNavClick = () => {
    setListTileIsVisible(true);
    setDisplayList(false);
  };

  return (
    <>
    <PageContent>
      {session ? (
        <div className={c.container}>
          <Nav 
          setView={setView} 
          resetView={() => setListView(session?.user?.role)}
          onNavClick={handleNavClick}
        />
          <div className={c.rowRight}>
            {view === 'dashboard' && <Calendar />}
            {view === 'services' && <Services />}
            {view === 'settings' && <Settings />}
            {view === 'gallery' && <GallerySettings />}
            {view === 'checklist' && <CheckList
             setListView={setListView} 
             listView={listView}
             listTileIsVisible={listTileIsVisible}
             setListTileIsVisible={setListTileIsVisible}
             displayList={displayList}
             setDisplayList={setDisplayList}
            />}
          </div>
        </div>
      ) : (
        <Login />
      )}
      
    </PageContent>
    </>
  );
}
