'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import c from './Nav.module.css';
import logo from '@/public/images/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState('/'); // underline
  const [isSmallNavActive, setIsSmallNavActive] = useState(false); // closes menu and sets underline
  const router = useRouter();
  // console.log(pathname);
  const validPaths = ['/', '/features', '/gallery', '/crew', '/calendar'];

  useEffect(() => {
    if (!validPaths.includes(pathname)) {
      setIsActive(null);
    } else {
      setIsActive(pathname);
    }
  }, [pathname]);

  function handleClick(path) {
    // console.log(path);
    setIsActive(path);
    setIsSmallNavActive(!isSmallNavActive);
  }

  function toogleSmallScreenNav() {
    setIsSmallNavActive(!isSmallNavActive);
  }

  return (
    <>
      <div className={c.container}>
        <nav className={c.nav}>
          <div className={c.logo} onClick={() => router.push('/')}>
            <Image
              src={logo}
              width={200}
              height={'auto'}
              alt="logo"
              priority={true}
            />
          </div>
          <ul className={c.wideMenu}>
            <li onClick={() => handleClick('/')}>
              <Link
                className={`${c.menuLink} ${isActive === '/' ? c.active : ''}`}
                href="/"
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
          <i
            className={`bi bi-list ${c.smallMenuIcon}`}
            onClick={toogleSmallScreenNav}
          ></i>
          <div
            className={`${c.smallNav} ${
              isSmallNavActive ? c.smallNavActive : ''
            }`}
          >
            <ul className={c.smallMenu}>
              <li>
                <span className={c.close} onClick={toogleSmallScreenNav}>
                  X
                </span>
              </li>
              <li onClick={() => handleClick('/')}>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/' ? c.active : ''
                  }`}
                  href="/"
                >
                  HOME
                </Link>
              </li>
              <li onClick={() => handleClick('/features')}>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/features' ? c.active : ''
                  }`}
                  href="/features"
                >
                  FEATURES
                </Link>
              </li>
              <li onClick={() => handleClick('/gallery')}>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/gallery' ? c.active : ''
                  }`}
                  href={'/gallery'}
                >
                  GALLERY
                </Link>
              </li>

              {/* <li onClick={() => handleClick('/reviews')}>
            <Link
              className={`${c.menuLink} ${
                isActive === '/reviews' ? c.active : ''
              }`}
              href={'/reviews'}
             
            >
              REVIEWS
            </Link>
          </li> */}

              <li onClick={() => handleClick('/crew')}>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/crew' ? c.active : ''
                  }`}
                  href={'/crew'}
                >
                  CREW
                </Link>
              </li>
              <li onClick={() => handleClick('/calendar')}>
                <Link
                  className={`${c.menuLink} ${
                    isActive === '/calendar' ? c.active : ''
                  }`}
                  href={'/calendar'}
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
