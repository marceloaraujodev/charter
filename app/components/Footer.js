'use client';
import React from 'react';
import Image from 'next/image';
import c from './Footer.module.css';
import logo from '@/public/images/logo.png';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const { data: session, status } = useSession();
  const router = useRouter();


  async function handleSignout() {
    await signOut({ redirect: true, callbackUrl: '/' });
  }

  function handleClick(type, text) {
    console.log(type);
    console.log(text);
    if (type === 'email') {
      console.log('enter email');
      window.location.href = 'mailto:example@example.com';
    }
    if (type === 'phone') {
      console.log('enter phone');
      navigator.clipboard.writeText(text);
    }
    if (type === 'instagram') {
      window.open('https://www.instagram.com/aphrodite_yacht/');
    }
    if (type === 'message') {
      router.push('/contact')
    }
  }

  return (
    <footer className={c.footer}>
      <div className={c.container}>
        <div className={c.title}>
          <Image
            src={logo}
            width={200}
            height={'auto'}
            alt="logo"
            priority={true}
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
                  className="size-6"
                >
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
                  className="size-6"
                >
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
                  className="size-6"
                >
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
                  className="size-6"
                >
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
                  className="size-6"
                >
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>{' '}
                <Link href={'/auth/login'}>Admin</Link>
              </li>

              {session && (
                <li>
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
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>{' '}
                  <span onClick={handleSignout}>logout</span>
                </li>
              )}
            </ul>
          </nav>

          <div className={c.rightBox}>
            <h2>Contact</h2>
            {/* <div> */}
            <div onClick={() => handleClick('email')}>
              <i className={`bi bi-envelope ${c.icons}`}>
                <span>aphroditecharters@gmail.com</span>
              </i>
            </div>
            <div
              onClick={(e) => handleClick('phone', e.target.textContent)}
              title="copy to clipboard"
            >
              <i className={`bi bi-telephone ${c.icons}`}>
                {' '}
                <span>949 204 7109</span>
              </i>
            </div>
            <div
              onClick={(e) => handleClick('instagram')}
              title="copy to clipboard"
            >
              <i className={`bi bi-instagram ${c.icons}`}>
                {' '}
                <span>instagram</span>
              </i>
            </div>
            <div
              onClick={(e) => handleClick('message')}
              title="copy to clipboard"
              className={c.icons}
             >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-arrow-up"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016" />
              </svg>
              <span>message us</span>
            </div>

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
