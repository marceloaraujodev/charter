'use client';
import { useEffect, useState } from 'react';
import c from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState('/'); // underline
  const [isSmallNavActive, setIsSmallNavActive] = useState(false);
  
  // console.log(pathname);

  useEffect(() => {
    if(isActive === '/auth/login'){
      setIsActive(null)
    }
    setIsActive(pathname);
  }, [pathname]);

  function handleClick(path) {
    console.log(path);
    setIsActive(path);
    setIsSmallNavActive(!isSmallNavActive)
  }

  function toogleSmallScreenNav() {
    setIsSmallNavActive(!isSmallNavActive)
  }

  return (
    <>
      <div className={c.container}>
      <nav className={c.nav}>
        <div className={c.logo}>APHRODITE</div>
        <ul className={c.wideMenu}>
          <li>
            <Link
              className={`${c.menuLink} ${isActive === '/' ? c.active : ''}`}
              href="/"
              onClick={() => handleClick('/')}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/features' ? c.active : ''
              }`}
              href="/features"
              onClick={() => handleClick('/features')}
            >
              FEATURES
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/gallery' ? c.active : ''
              }`}
              href={'/gallery'}
              onClick={() => handleClick('/gallery')}
            >
              GALLERY
            </Link>
          </li>

          {/* <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/reviews' ? c.active : ''
              }`}
              href={'/reviews'}
              onClick={() => handleClick('/reviews')}
             >
              REVIEWS
            </Link>
          </li> */}

          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/crew' ? c.active : ''
              }`}
              href={'/crew'}
              onClick={() => handleClick('/crew')}
            >
              CREW
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/calendar' ? c.active : ''
              }`}
              href={'/calendar'}
              onClick={() => handleClick('/calendar')}
            >
              PRICE & AVAILABILITY
            </Link>
          </li>
        </ul>
        <i className={`bi bi-list ${c.smallMenuIcon}`} onClick={toogleSmallScreenNav}></i>
        <div className={`${c.smallNav} ${isSmallNavActive ? c.smallNavActive : ''}`} >
        <ul className={c.smallMenu}>
          <li>
            <Link
              className={`${c.menuLink} ${isActive === '/' ? c.active : ''}`}
              href="/"
              onClick={() => handleClick('/')}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/features' ? c.active : ''
              }`}
              href="/features"
              onClick={() => handleClick('/features')}
            >
              FEATURES
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/gallery' ? c.active : ''
              }`}
              href={'/gallery'}
              onClick={() => handleClick('/gallery')}
            >
              GALLERY
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/reviews' ? c.active : ''
              }`}
              href={'/reviews'}
              onClick={() => handleClick('/reviews')}
            >
              REVIEWS
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/crew' ? c.active : ''
              }`}
              href={'/crew'}
              onClick={() => handleClick('/crew')}
            >
              CREW
            </Link>
          </li>
          <li>
            <Link
              className={`${c.menuLink} ${
                isActive === '/calendar' ? c.active : ''
              }`}
              href={'/calendar'}
              onClick={() => handleClick('/calendar')}
            >
              PRICE & AVAILABILITY
            </Link>
          </li>
        </ul>
        </div>
      </nav>
    </div>


      
    </>
  );
}
