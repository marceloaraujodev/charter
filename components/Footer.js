import React from 'react'
import c from './Footer.module.css'



export default function Footer() {
  return (
    <footer className={c.footer}>
      <i className={`bi bi-envelope ${c.icons}`}></i>
      <i className={`bi bi-telephone ${c.icons}`}></i>
      <i className={`bi bi-calendar-check ${c.icons}`}></i>
    </footer>
  )
}
