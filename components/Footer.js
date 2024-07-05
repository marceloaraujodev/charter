'use client'
import React from 'react'
import c from './Footer.module.css'
import Link from 'next/link'
import { signOut } from 'next-auth/react';

export default function Footer() {
  // const router = useRouter();
  return (
    <footer className={c.footer}>
      <i className={`bi bi-envelope ${c.icons}`}></i>
      <i className={`bi bi-telephone ${c.icons}`}></i>
      <i className={`bi bi-calendar-check ${c.icons}`}></i>
      <Link href={'/auth/login'}>Admin</Link>
      <p onClick={() => signOut ()}>logout</p>

    </footer>
  )
}
