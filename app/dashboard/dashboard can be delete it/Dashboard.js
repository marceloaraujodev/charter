// 'use client';
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useGlobalContext } from '@/app/GlobalContext';
// import Nav from '@/app/dashboard/nav/Nav';
// import Calendar from '@/app/components/Calendar';
// import { signOut, useSession } from 'next-auth/react';
// import Services from '../services/Services';
// import CheckList from '../checklist/CheckList';
// import Login from '../../components/Login';
// import Settings from '../settings/Settings';
// import GallerySettings from '../gallery/GallerySettings';
// import PageContent from '../../components/PageContent';
// import c from './Dashboard.module.css';


// export default function page() {
//   const { 
//     setListTileIsVisible,
//     setDisplayList, 
//   } = useGlobalContext();

//   const { data: session } = useSession();
//   const [view, setView] = useState('dashboard');
//   const [listView, setListView] = useState(session?.user?.role);


 
//   useEffect(() => {
//     if (view === 'signout') {
//       signOut();
//     }
//   }, [view]);

//    // Scroll to top on view change
//    useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [view]);

//   const handleNavClick = () => {
//     setListTileIsVisible(true);
//     setDisplayList(false);
//   };

//   return (
//     <>
//     <PageContent>
//       {/* {!session?.user?.role ? <Login /> : (
//               session?.user?.role === 'admin' ? (
//                 <> 
//                 <div className={c.container}>
//                   <Nav 
//                   setView={setView} 
//                   resetView={() => setListView(session?.user?.role)}
//                   onNavClick={handleNavClick}
//                  />
//                   <div className={c.rowRight}>
//                     {view === 'dashboard' && <Calendar />}
//                     {view === 'services' && <Services />}
//                     {view === 'settings' && <Settings />}
//                     {view === 'gallery' && <GallerySettings />}
//                     {view === 'checklist' && <CheckList
//                      setListView={setListView} 
//                      listView={listView}
//                     />}
//                   </div>
//                 </div>
//                 </>
//               ) : (
//                 <>
//                 <div className={c.container}>
//                 <Nav 
//                 setView={setView} 
//                 resetView={() => setListView(session?.user?.role)}
//                 onNavClick={handleNavClick}
//                />
//                 <div className={c.rowRight}>
//                   {view === 'dashboard' && <Calendar />}
//                   {view === 'services' && <Services />}
//                   {view === 'settings' && <Settings />}
//                   {view === 'gallery' && <GallerySettings />}
//                   {view === 'checklist' && <CheckList
//                    setListView={setListView} 
//                   />}
//                 </div>
//               </div>
//               </>
//               )
//       )} */}
// <div className={c.container}>
//       <Nav 
//         setView={setView} 
//         resetView={() => setListView(session?.user?.role)}
//         onNavClick={handleNavClick}
//       />
//       <div className={c.rowRight}>
//         {view === 'dashboard' && <Calendar />}
//         {view === 'services' && <Services />}
//         {view === 'settings' && <Settings />}
//         {view === 'gallery' && <GallerySettings />}
//         {view === 'checklist' && (
//           <CheckList setListView={setListView} listView={listView} />
//         )}
//       </div>
//     </div>
      
//     </PageContent>
//     </>
//   );
// }
