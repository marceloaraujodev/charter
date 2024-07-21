import { useState } from 'react';
import Vendors from '../vendors/Vendors';
import CreateUser from '../createuser/CreateUser';
import CrewSettings from '../crewsettings/CrewSettings';
import Users from '../users/Users';
import { useSession } from 'next-auth/react';
import c from './Settings.module.css';
export default function Settings() {
  const [view, setView] = useState('createuser');
  const { data: session } = useSession();
  

  // setUser(session.user.user); 
  // console.log(session)

  return (
    <div className={c.container}>
      Settings
      <div className={c.innerContainer}>
        <div className={c.menu}>
          <ul>
            <li className={view === 'createuser' ? c.active : null}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span
                onClick={() => setView('createuser')}
                className={`$ ${
                  c.linkText
                }`}
              >
                Create User
              </span>
            </li>

            <li className={view === 'users' ? c.active : null}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span
                onClick={() => setView('users')}
                className={c.linkText}
              >
                Users
              </span>
            </li>

            <li className={view === 'vendors' ? c.active : null}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>

              <span
                onClick={() => setView('vendors')}
                className={` ${
                  c.linkText
                }`}
              >
                Vendors
              </span>
            </li>
            <li className={view === 'crew' ? c.active : null}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span
                onClick={() => setView('crew')}
                className={` ${
                  c.linkText
                }`}
              >
                Crew
              </span>
            </li>
          </ul>
        </div>

        <div className={c.content}>
          {view === 'createuser' && <CreateUser session={session} />}
          {view === 'users' && <Users session={session} />}
          {view === 'vendors' && <Vendors session={session} />}
          {view === 'crew' && <CrewSettings session={session} />}
        </div>
      </div>
    </div>
  );
}
