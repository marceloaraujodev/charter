'use client';
import React from 'react';
import Image from 'next/image';
import c from './Footer.module.css';
import logo from '@/public/images/logo.png';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Footer() {
  // const router = useRouter();

  async function handleSignout(){
    await signOut({redirect: true, callbackUrl: '/'})
  }

  return (
    <footer className={c.footer}>
      <div className={c.container}>
        <div className={c.title}>
          <Image 
          src={logo}
          width={200}
          height={'auto'}
          alt='logo'
        />
        </div>

        <div className={c.row}>
          <nav className={c.leftBox}>
            <h2>Menu</h2>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/'}>Home</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/features'}>Features</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/gallery'}>Gallery</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/crew'}>Crew</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/calendar'}>Price & Avalability</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/auth/login'}>Admin</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <span onClick={handleSignout}>logout</span>
              </li>

            </ul>
          </nav>

          <div className={c.rightBox}>
          <h2>Contact</h2>
            {/* <div> */}
              <i className={`bi bi-envelope ${c.icons}`}><span>aphroditecharters@gmail.com</span></i> 
              <i className={`bi bi-telephone ${c.icons}`}> <span>333 333 3333</span></i>
              {/* <i className={`bi bi-calendar-check ${c.icons}`}></i> */}
              {/* <Link href={'/auth/login'}>Admin</Link>
              <span onClick={() => signOut()}>logout</span> */}
            {/* </div> */}
            {/* <div>
              Follow Us
              <div>social media Icons</div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
