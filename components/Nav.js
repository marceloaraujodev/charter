'use client';
import { useEffect, useState } from 'react';
import classes from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState('/');
  console.log(pathname);

  useEffect(() => {
    setIsActive(pathname);
  }, []);

  function handleClick(path) {
    console.log(path);
    setIsActive(path);
  }

  return (
    <nav className={classes.nav}>
      <p className={classes.logo}>APHRODITE</p>
      <ul>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/' ? classes.active : ''
            }`}
            href="/"
            onClick={() => handleClick('/')}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/features' ? classes.active : ''
            }`}
            href="/features"
            onClick={() => handleClick('/features')}
          >
            FEATURES
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/gallery' ? classes.active : ''
            }`}
            href={'/gallery'}
            onClick={() => handleClick('/gallery')}
          >
            GALLERY
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/reviews' ? classes.active : ''
            }`}
            href={'/reviews'}
            onClick={() => handleClick('/reviews')}
          >
            REVIEWS
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/crew' ? classes.active : ''
            }`}
            href={'/crew'}
            onClick={() => handleClick('/crew')}
          >
            CREW
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === '/pricing' ? classes.active : ''
            }`}
            href={'/pricing'}
            onClick={() => handleClick('/pricing')}
          >
            PRICING & AVAILABILITY
          </Link>
        </li>
      </ul>
    </nav>
  );
}
