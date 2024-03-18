'use client';
import { useState } from 'react';
import classes from './Nav.module.css';
import Link from 'next/link';


export default function Nav({router}) {
  const [isActive, setIsActive] = ('#home');

  function handleClick(href){

  }

  return (
    <nav className={classes.nav}>
      <div className={classes.logoContainer}>
      <p className={classes.logo}>FINALLY</p>
      </div>
      <ul>
      <li>
          <Link className={`${classes.menuLink} ${classes.active}`} href={'#home'}>HOME</Link>
        </li>
        <li><Link className={classes.menuLink} href={'#features'}>FEATURES</Link></li>
        <li><Link className={classes.menuLink} href={'#gallery'}>GALLERY</Link></li>
        <li><Link className={classes.menuLink} href={'#reviews'}>REVIEWS</Link></li>
        <li><Link className={classes.menuLink} href={'#meet'}>MEET THE CREW</Link></li>
        <li><Link className={classes.menuLink} href={'#pricing'}>PRICING & AVAILABILITY</Link></li>
      </ul>
    </nav>
  )
}
