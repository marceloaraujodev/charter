import React from 'react';
import Button from '@/components/Button';
import c from './login.module.css';

export default function loginPage() {
  return (
    <div className='container'>
      <form className={c.containerInner}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='email'/>
        <label htmlFor='password' >Password</label>
        <input type='password' name='password' placeholder='password' />
        <Button classname={c.btn}>Submit</Button>
      </form>
    </div>
  )
}
