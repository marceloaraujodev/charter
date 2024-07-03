import React from 'react'
import c from './login.module.css'

export default function loginPage() {
  return (
    <div className='container'>
      <div className={c.containerInner}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
      </div>
    </div>
  )
}
