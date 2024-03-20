'use client';
import { useState } from 'react';
import classes from './Nav.module.css';
import Link from 'next/link';

export default function Nav() {
  // const [navLink, setNavLink] = useState('#home');
  const [isActive, setIsActive] = useState();

  function handleClick(e) {
    setIsActive(e.target.textContent)
  }

  return (

    <nav className={classes.nav}>
      {/* <div className={classes.logoContainer}>
        <p className={classes.logo}>FINALLY</p>
      </div> */}
      <p className={classes.logo}>APHRODITE</p>
      <ul>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'HOME' ? classes.active : ''
            }`}
            href="/"
            onClick={handleClick}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'FEATURES' ? classes.active : ''
            }`}
            href="#features"
            onClick={handleClick}
          >
            FEATURES
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'GALLERY' ? classes.active : ''
            }`}
            href={'#gallery'}
            onClick={handleClick}
          >
            GALLERY
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'REVIEWS' ? classes.active : ''
            }`}
            href={'#reviews'}
            onClick={handleClick}
          >
            REVIEWS
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'MEET THE CREW' ? classes.active : ''
            }`}
            href={'#meet'}
            onClick={handleClick}
          >
            MEET THE CREW
          </Link>
        </li>
        <li>
          <Link
            className={`${classes.menuLink} ${
              isActive === 'PRICING & AVAILABILITY' ? classes.active : ''
            }`}
            href={'#pricing'}
            onClick={handleClick}
          >
            PRICING & AVAILABILITY
          </Link>
        </li>
      </ul>
    </nav>

  );
}
