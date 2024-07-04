'use client'
import React from 'react';
import { useState } from 'react';
import Button from '@/components/Button';
import axios from 'axios';

import c from './Login.module.css';

export default function loginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  function handleInput(e){
    if(e.target.name === 'email'){
      setEmail(e.target.value)
    }else{
      setPassword(e.target.value)
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    // console.log('form submitted')
    const formData = {
      email,
      password
    }
    // console.log(formData)
    const res = await axios.post('http://localhost:3000/api/login', formData)

    console.log(res)
    if(res.data.auth){
      console.log('authenticated')
    }else{
      console.log('wrong user or pass')
    }
  }

  return (
    <div className='container'>
      <form className={c.containerInner} onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input onChange={handleInput} type='email' name='email' value={email} placeholder='email'/>
        <label htmlFor='password'>Password</label>
        <input onChange={handleInput} type='password' name='password' value={password} placeholder='password' />
        <Button type='submit' className={c.btn}>Submit</Button>
      </form>
    </div>
  )
}