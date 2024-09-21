
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/app/GlobalContext';
import Nav from '@/app/dashboard/nav/Nav';
import Calendar from '@/app/components/Calendar';
import { signOut, useSession } from 'next-auth/react';
import Services from './services/Services';
import CheckList from './checklist/CheckList';
import Login from '../components/Login';
import Settings from './settings/Settings';
import GallerySettings from './gallery/GallerySettings';
import PageContent from '../components/PageContent';
import Spinner from '../components/Spinner';
import c from './Dashboard.module.css';


export default function page() {
  const { 
    setListTileIsVisible,
    setDisplayList, 
  } = useGlobalContext();

  const { data: session, status } = useSession();
  const [view, setView] = useState('dashboard');
  const [listView, setListView] = useState(session?.user?.role);
  const [loading, setLoading] = useState(true);
  console.log('this is session', session)
  console.log('this is status', status)

  useEffect(() => {
    if(status === 'authenticated' || status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    if (view === 'signout') {
      signOut();
    }
  }, [view]);

   // Scroll to top on view change
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);


  const handleNavClick = () => {
    setListTileIsVisible(true);
    setDisplayList(false);
  };

  const renderContent = () => {
    if(!session){
      return <Login />
    }

    if(session.user.role === 'admin'){
      return(
        <> 
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
            />}
          </div>
        </div>
        </>
      )
    }else{
      // return regular authorized user
      return (
        <>
        <div className={c.container}>
        <Nav 
        setView={setView} 
        resetView={() => setListView(session?.user?.role)}
        onNavClick={handleNavClick}
       />
        <div className={c.rowRight}>
          {view === 'dashboard' && <Calendar />}
          {view === 'checklist' && <CheckList
           setListView={setListView} 
           />}
           {/* below only admins */}
           {view === 'services' && <Services />}
           {view === 'settings' && <Settings />}
           {view === 'gallery' && <GallerySettings />}
        </div>
      </div>
      </>
      )
    }
  }


  return (
    <>
    <PageContent>
      {loading ? <Spinner /> : renderContent()}

    </PageContent>
    </>
  );
}
