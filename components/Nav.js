'use client';
import { useEffect, useState } from 'react';
import c from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState('/');
  // console.log(pathname);

  useEffect(() => {
    setIsActive(pathname);
  }, []);

  function handleClick(path) {
    console.log(path);
    setIsActive(path);
  }

  return (
    <>
      {/* <div className={c.container}> */}
      <nav className={c.nav}>
        {/* <p className={c.logo}>APHRODITE</p> */}
        <ul>
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
                isActive === '/pricing' ? c.active : ''
              }`}
              href={'/pricing'}
              onClick={() => handleClick('/pricing')}
            >
              PRICING & AVAILABILITY
            </Link>
          </li>
        </ul>
      </nav>
    {/* </div> */}

      {/* <div className={c.smallNav}>
        <div className={c.contentContainer}>
          <i className={`bi bi-list ${c.menuIcon}`}></i>
          <div className={c.menuItems}>
            <ul>
              <li>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/' ? c.active : ''
                  }`}
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
                    isActive === '/pricing' ? c.active : ''
                  }`}
                  href={'/pricing'}
                  onClick={() => handleClick('/pricing')}
                >
                  PRICING & AVAILABILITY
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      
    </>
  );
}
